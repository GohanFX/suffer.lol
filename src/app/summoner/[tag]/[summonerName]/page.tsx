import { redirect, useRouter } from "next/navigation";
import React from "react";

const page = ({
  params,
}: {
  params: {
    tag: string;
    summonerName: string;
  };
}) => {
  redirect(`/summoner/${params.tag}/${params.summonerName}/overview`)
};

export default page;
