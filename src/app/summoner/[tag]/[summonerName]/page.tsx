import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = ({
  params,
}: {
  params: {
    tag: string;
    summonerName: string;
  };
}) => {
  redirect(`/summoner/${params.tag}/${params.summonerName}/overview`)
  return <div>page</div>;
};

export default page;
