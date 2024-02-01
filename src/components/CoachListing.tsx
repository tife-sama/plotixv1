// CoachListing.tsx
import React, { useEffect, useState } from "react";
import { Coaches } from "@/payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { COACH_CATEGORIES } from "@/config";
import ImageSlider from "./ImageSlider";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CoachListingProps {
  coaches: Coaches;
  index: number;
}

const getTypeOfWorkLabel = (typeOfWork) => {
  const typeOfWorkLabels = {
    workedFor: "Worked For",
    workedOn: "Worked On",
    worksAt: "Works At",
  };

  return typeOfWorkLabels[typeOfWork] || typeOfWork;
};

function truncateText(text, maxLength) {
  const words = text.split(" ");
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "...";
  }
  return text;
}

const CoachListing: React.FC<CoachListingProps> = ({ coaches, index }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Reverse the order of rendering coaches
  const reversedIndex = 1 - index; // Assuming you have a fixed number of coaches (5 in this case)

  // Show coach card in order of index (loading up)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, reversedIndex * 75);

    return () => clearTimeout(timer);
  }, [reversedIndex]);

  if (!coaches || !isVisible) return <CoachPlaceholder />;

  const label = COACH_CATEGORIES.find(
    ({ value }) => value === coaches.category
  )?.label;

  const validUrls = Array.isArray(coaches.profilePicture)
    ? (coaches.profilePicture
        .map(({ image }) => (typeof image === "string" ? image : image.url))
        .filter(Boolean) as string[])
    : [];

  if (isVisible && coaches) {
    //URL
    // Coach link to detail page
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/coach/${coaches.id}`}
      >
        {/* Card container without border */}
        <div className="flex flex-col max-h-full h-full mx-auto  lg:mb-2 overflow-hidden">
          {/* Border applied to the grid column */}
          <div className="border border-gray-300 rounded-2xl h-full shadow">
            {/* Coach IMAGE*/}
            <div style={{ position: "relative" }}>
              <ImageSlider urls={validUrls} />
              {coaches.freeIntroductionOption &&
              coaches.freeIntroductionOption[0]?.freeIntroChoice ? (
                <Badge
                  className="ml-1 mr-2 mt-1"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="uppercase font-bold mb-0 text-[8.5px]">
                    Free Intro
                  </p>
                </Badge>
              ) : null}
            </div>

            <div className="flex flex-col flex-1 p-1 rounded-b-lg bg-white overflow-hidden mt-1">
              <div className="flex items-center justify-between">
                {/* Coach NAME */}
                <h3 className="text-xl text-gray-700 font-bold">
                  {coaches.name}
                </h3>
                {/* HourlyRate */}
                <div className="flex items-center justify-center truncate rounded px-1 md:px-1.5  text-sm font-medium text-neutral-400">
                  {` ${formatPrice(coaches.hourlyRate)}/hr`}
                  {/* Conditional rendering for free intro label */}
                </div>
              </div>
              {/* Headline */}
              <h3 className="mt-3 mb-4 font-semibold text-xs overflow-hidden overflow-ellipsis">
                {coaches.headline}
              </h3>

              {/* WORK HISTORY */}
              <div className="flex flex-wrap">
                {coaches.workHistory &&
                  coaches.workHistory
                    .slice(0, 2)
                    .map((workHistoryItem, index) => (
                      <div key={index} className="items-center justify-center">
                        <div className="relative mr-2">
                          {workHistoryItem.companyName && (
                            <Badge variant={"outline"}>
                              <Image
                                alt={`${workHistoryItem.companyName} Logo`}
                                loading="lazy"
                                width=""
                                height=""
                                decoding="async"
                                data-nimg="1"
                                className="object-contain shrink-0 rounded-full h-6"
                                style={{ color: "transparent" }}
                                src={`https://logo.clearbit.com/${workHistoryItem.companyName}.com?size=200&w=64&q=75`}
                              />
                              <div className="text-neutral-600 text-[10px] font-semibold leading-none ml-1">
                                {getTypeOfWorkLabel(workHistoryItem.typeOfWork)}{" "}
                                {workHistoryItem.companyName}
                              </div>
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
              </div>

              {/* About Me */}
              <section className="mt-2 mb-4">
                <div className="flex items-center w-full">
                  {coaches.aboutMe && coaches.aboutMe[0]?.children && (
                    <div className="text-gray-500 text-[14px]">
                      {truncateText(coaches.aboutMe[0].children[0]?.text, 12)}
                    </div>
                  )}
                </div>
              </section>

              {/* FOCUS AREA */}
              <hr className="mb-2" />
              <p className="ml-1 mb-2 font-semibold text-xs overflow-hidden overflow-ellipsis">
                Can help with:
              </p>
              <div className="flex flex-wrap mb-2">
                {coaches.focusAreas &&
                  coaches.focusAreas.slice(0, 4).map((focusArea, index) => (
                    <div key={index} className=" ">
                      <div className="relative mr-2">
                        <Badge className="bg-purple-200">
                          <div className="text-purple-800 text-[10px] font-semibold text-center">
                            {focusArea}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  ))}

                {/* Displaying free session duration */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

const CoachPlaceholder: React.FC = () => {
  return (
    <div className="flex flex-col max-h-full h-full w-[316px] mx-auto mb-8">
      {/* Card container without border */}
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};

export default CoachListing;
