import {
  createAutomations,
  saveListner,
  updateAutomationName,
} from "@/actions/automations";
import { useMutationData } from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import useZodForm from "./use-zod-form";

export const useCreateAutomation = () => {
  const { mutate, isPending } = useMutationData(
    ["create-automation"],
    (mutationData) => createAutomations(mutationData),
    "user-automations"
  );
  return { mutate, isPending };
};

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const enableEdit = () => setEdit(true);

  const disableEdit = () => setEdit(false);

  const { isPending, mutate } = useMutationData(
    ["update-automation"],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value });
        } else {
          disableEdit();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return { edit, enableEdit, disableEdit, inputRef, isPending };
};

export const useListner = (id: string) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMARTAI">("MESSAGE");
  const promptSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string(),
  });

  const {} = useMutationData(
    ["create-listner"],
    (data: { prompt: string; reply: string }) =>
      saveListner(id, listener, data.prompt, data.reply),
    "automation-info"
  );
  const {} = useZodForm();
};
