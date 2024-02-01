import Image from "next/image";
import React from "react";

const MyWorkExperience = ({ workHistory }) => {
  if (!workHistory || workHistory.length === 0) {
    return <div className="font-semibold mt-5 mb-4">No Work Experience</div>;
  }

  return (
    <div className="font-semibold mt-5 mb-4">
      <p className="mb-6 text-lg">Work Experience</p>
      {workHistory.map((workHistoryItem, index) => (
        <div key={index} className="mb-4 mt-2">
          <div className="flex items-center space-x-4 mb-8">
            <Image
              alt={`${workHistoryItem.companyName} Logo`}
              loading="lazy"
              width=""
              height=""
              decoding="async"
              data-nimg="1"
              className="object-contain shrink-0 rounded-full h-10 w-10 mr-4"
              src={`https://logo.clearbit.com/${workHistoryItem.companyName}.com?size=200&w=64&q=75`}
            />
            <div>
              <p className="text-gray-800 text-md">{workHistoryItem.role}</p>
              <p className="text-gray-500 text-sm mr-2">
                {workHistoryItem.companyName}{" "}
                <span className="text-gray-500 text-sm">{" | "}</span>
                <span className="text-gray-500 text-sm">
                  {workHistoryItem.startDate
                    ? new Date(workHistoryItem.startDate).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "Present"}
                </span>{" "}
                -{" "}
                {workHistoryItem.endDate
                  ? new Date(workHistoryItem.endDate).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Present"}
              </p>
            </div>
          </div>
          {index < workHistory.length - 1 && <hr />}{" "}
          {/* Add this line for <hr /> */}
        </div>
      ))}
      <hr />
    </div>
  );
};

export default MyWorkExperience;
