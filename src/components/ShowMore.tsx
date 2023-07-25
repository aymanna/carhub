'use client'

import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import Btn from "./Btn";
import { updateSearchParams } from "@/utils";
import { baseLimit } from "@/constants";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * baseLimit;
    const newPathName = updateSearchParams('limit', `${newLimit}`);

    router.push(newPathName);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <Btn
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore
