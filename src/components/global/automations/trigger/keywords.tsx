import { Input } from "@/components/ui/input";
import { useKeywords } from "@/hooks/use-automations";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomation } from "@/hooks/use-query";
import { X } from "lucide-react";

type Props = { id: string };

const Keywords = ({ id }: Props) => {
  const { onValueChange, deleteMutation, keyword, onKeyPress } =
    useKeywords(id);
  const { latestVariable } = useMutationDataState(["add-keyword"]);

  const { data } = useQueryAutomation(id);
  // console.log("keywords", data?.data?.Keywords);
  console.log("keywords", latestVariable);

  return (
    <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
      <p className="text-sm text-text-secondary">
        Add words that trigger automations
      </p>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {data?.data?.Keywords &&
          data.data.Keywords.length > 0 &&
          data.data.Keywords.map(
            (word) =>
              word.id !== latestVariable?.variables.id && (
                <div
                  key={word.id}
                  className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full
                "
                >
                  {word.word}
                  <X
                    size={20}
                    onClick={() => deleteMutation({ id: word.id })}
                  />
                </div>
              )
          )}
        {latestVariable && latestVariable.status === "pending" && (
          <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
            {latestVariable.variables.keyword.keyword}
          </div>
        )}
        <Input
          placeholder="Add Keyword..."
          style={{
            width:
              Math.min(Math.max(keyword.keyword.length || 10, 6), 30) + "ch",
          }}
          value={keyword.keyword}
          className={`px-1 bg-transparent ring-0 border-none outline-none ${
            keyword.keyword.length <= 6 ? "min-w-10" : ""
          }`}
          onChange={onValueChange}
          onKeyUp={onKeyPress}
        />
        <span>
          {latestVariable &&
          latestVariable.status === "pending" &&
          latestVariable.variables.keyword.error
            ? "keyword cannot be empty"
            : ""}
        </span>
      </div>
    </div>
  );
};

export default Keywords;
