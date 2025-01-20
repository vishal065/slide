import React from "react";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const {} = useListner(id);
  return <div>ThenAction</div>;
};

export default ThenAction;
