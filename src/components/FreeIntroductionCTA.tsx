// FreeIntroductionCTA.tsx
import React from "react";

interface FreeIntroductionCTAProps {
  coachName: string;
  selectedLabel: string;
  hasFreeIntroduction: boolean;
}

const FreeIntroductionCTA: React.FC<FreeIntroductionCTAProps> = ({
  coachName,
  selectedLabel,
  hasFreeIntroduction,
}) => {
  if (!hasFreeIntroduction) {
    return null; // Do not render anything if free introduction is not available
  }

  return (
    <div className="mb-10 w-full h-full md:h-[99px] md:w-[600px] lg:w-[801px] xl:w-[834px] relative bg-stone-100 rounded-2xl flex flex-col md:flex-row md:items-center">
      <div className="ml-4 flex-auto flex items-center md:mr-8">
        <div className="">
          <div className="">
            <div className="text-neutral-950 text-base font-semibold  ">
              Free Introduction Session with {coachName.split(" ")[0]}
            </div>

            <div className="w-0.5 h-0.5 bg-stone-400 rounded-full mt-1.5" />
          </div>
          <div className="text-stone-400 text-sm font-medium leading-tight">
            Kickstart Your Journey with a Free {selectedLabel} Group Session
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 mt-4 md:mt-0 mr-6">
        <button className="w-full md:w-[132px] h-10 px-4 py-3 rounded-[300px] border border-purple-700 flex items-center justify-center gap-2.5 mb-4 ml-2">
          <div className="text-purple-700 text-sm font-semibold  leading-none">
            Reserve Now
          </div>
        </button>
      </div>
    </div>
  );
};

export default FreeIntroductionCTA;
