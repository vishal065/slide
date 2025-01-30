import OpenAI from "openai";
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponses,
} from "@/actions/webhooks/queries";
import { sendDM } from "@/lib/fetch";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { findAutomation } from "@/actions/automations/queries";

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();
  let matcher;
  try {
    if (webhook_payload.entry[0].messaging) {
      //for messages
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      );
    }
    if (webhook_payload.entry[0].changes) {
      //for comments
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].message.text
      );
    }
    if (matcher && matcher.automationId) {
      //we have a keyword matcher
      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true
        );
        if (automation && automation.trigger) {
          if (automation.listner && automation.listner.listener === "MESSAGE") {
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id, //from instagram side its sender id but from our side its reciever id (jisko msg bhejna h)
              automation.listner?.prompt,
              automation.User?.Integrations[0].token as string
            );
            if (direct_message.status === 200) {
              const tracked = await trackResponses(automation.id, "DM");
              if (tracked) {
                return NextResponse.json(
                  { message: "Message Sent" },
                  { status: 200 }
                );
              }
            }
          }
          if (
            automation.listner &&
            automation.listner.listener === "SMARTAI" &&
            automation.User?.Subscription?.plan === "PRO"
          ) {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listner.prompt}: Keep responses under 2 sentences`,
                },
              ],
            });
            if (smart_ai_message.choices[0].message.content) {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text
              );
              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content
              );
              await client.$transaction([reciever, sender]);

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.User?.Integrations[0].token
              );
              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "DM");
                if (tracked) {
                  return NextResponse.json(
                    { message: "Message Sent" },
                    { status: 200 }
                  );
                }
              }
            }
          }
        }
      }
      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === "comments" // this tell the payload it send is comment (basically customer ne comment kiya)
      ) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          false
        );
        const automations_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id as string
        );
        if (automation && automations_post && automation.trigger) {
          if (automation.listner) {
            if (automation.listner.listener === "MESSAGE") {
              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.from.id,
                automation.listner?.prompt,
                automation.User?.Integrations[0].token as string
              );
              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "COMMENT");
                if (tracked) {
                  return NextResponse.json(
                    { message: "Message Sent" },
                    { status: 200 }
                  );
                }
              }
            }
            if (
              automation.listner.listener === "SMARTAI" &&
              automation.User?.Subscription?.plan === "PRO"
            ) {
              const smart_ai_message = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "assistant",
                    content: `${automation.listner.prompt}: keep response under 2 sentences`,
                  },
                ],
              });
              if (smart_ai_message.choices[0].message.content) {
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  webhook_payload.entry[0].changes[0].value.text
                );
                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.choices[0].message.content
                );
                await client.$transaction([reciever, sender]);
                const direct_message = await sendDM(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.choices[0].message.content,
                  automation.User.Integrations[0].token
                );
                if (direct_message.status === 200) {
                  const tracked = await trackResponses(
                    automation.id,
                    "COMMENT"
                  );
                  if (tracked) {
                    return NextResponse.json(
                      { message: "Message Sent" },
                      { status: 200 }
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
    if (!matcher) {
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      );
      if (customer_history.history.length > 0) {
        const automation = await findAutomation(
          customer_history.automationId as string
        );
        if (
          automation?.User?.Subscription?.plan === "PRO" &&
          automation.listner?.listener === "SMARTAI"
        ) {
          const smart_ai_message = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "assistant",
                content: `${automation.listner.prompt}: keep the responses under 2 sentences`,
              },
              ...customer_history.history,
              {
                role: "user",
                content: webhook_payload.entry[0].messaging[0].message.text,
              },
            ],
          });
          if (smart_ai_message.choices[0].message.content) {
            const reciever = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text
            );
            const sender = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content
            );
            await client.$transaction([reciever, sender]);
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content,
              automation.User.Integrations[0].token
            );
            if (direct_message.status === 200) {
              return NextResponse.json(
                { message: "Message sent" },
                { status: 200 }
              );
            }
          }
        }
      }
      return NextResponse.json(
        { message: "No automation set" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "No automation set -1" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "No automation set -2" },
      { status: 200 }
    );
  }
}
