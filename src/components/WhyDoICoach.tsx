// Use the correct relative path for the import
import { Coaches } from "../../collections/Coaches/Coaches";
import React from "react";

const WhyDoICoach = ({ whyICoach }) => {
  return (
    <div className="font-semibold mt-7 mb-6 text-lg">
      Coaching: My Simple Why
      <p className="text-gray-500 mt-4 w-full font-normal text-sm md:w-[600px] lg:w-[801px] xl:w-[834px]">
        {whyICoach}
        <hr className="mt-6" />
      </p>
    </div>
  );
};

export default WhyDoICoach;
