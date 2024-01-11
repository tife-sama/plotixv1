import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { getpayloadClient } from "@/get-payload";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Library, Star, Newspaper, PartyPopper } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, formatPrice } from "@/lib/utils";
import { Coaches } from "@/collections/Coaches/Coaches";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import MyCarousel from "@/components/MyCarousel";
import FreeIntroductionCTA from "@/components/FreeIntroductionCTA";
import MyCoachingPackage from "@/components/MyCoachingPackage";
import MyWorkExperience from "@/components/MyWorkExperience";
import WhyDoICoach from "@/components/WhyDoICoach";
import { Badge } from "@/components/ui/badge";
import CoachCTACard from "@/components/CoachCTACard";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CoachCTACardLG from "@/components/CoachCTACardLG";

interface PageProps {
  params: {
    coachId: string;
  };
}

const isFreeIntroChoiceChecked = Coaches.freeintrochoice === true;

const getTypeOfWorkLabel = (typeOfWork) => {
  const typeOfWorkLabels = {
    workedFor: "Worked For",
    workedOn: "Worked On",
    worksAt: "Works At",
  };
  return typeOfWorkLabels[typeOfWork] || typeOfWork;
};

const options = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  // Add other options as needed
];

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Explore", href: "/coaches" },
];

const Page = async ({ params }: PageProps) => {
  const payload = await getpayloadClient();
  const { coachId } = params;
  const { docs: coaches } = await payload.find({
    collection: "coaches",
    limit: 1,
    where: {
      id: {
        equals: coachId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  if (!coaches || !coaches.length) return notFound();

  const [coach] = coaches;

  const selectedFreeSessionDuration =
    coach.freeIntroductionOption?.[0]?.freeSessionDuration;

  const selectedOption = selectedFreeSessionDuration
    ? options.find((option) => option.value === selectedFreeSessionDuration)
    : null;

  const selectedLabel = selectedOption?.label || "Unknown";

  return (
    <MaxWidthWrapper className="bg-white mt-4 ">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-4 sm:py-8 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Coach Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2 text-sm mb-4">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="m5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div className="w-full h-[99px]  md:w-[450px] lg:w-[800px]  bg-gradient-to-r from-purple-500 to-purple-200  rounded-md" />
            <div className="flex flex-wrap justify-center md:justify-start  mt-4">
              {/* Avatar Section */}
              <Avatar className="mb-1 w-[110px] h-[110px] md:w-[125px] md:h-[125px]">
                <AvatarImage
                  src={coach.profilePicture[0]?.image?.sizes?.thumbnail?.url}
                  alt="ProfilePicture"
                  className="object-cover w-full h-full"
                />
                <AvatarFallback>{coach.name}</AvatarFallback>
              </Avatar>
              {/* BOOK A SESSION */}
              <div className="lg:border rounded-lg hidden md:flex flex-col items-end fixed top-50 sm:right-5 md:right-2.5 lg:right-1.5 xl:right-72 p-4">
                <CoachCTACardLG />
              </div>
              {/* Details Section */}
              <div className="text-center items-center justify-center ml-0 mt-6 w-full md:w-auto md:ml-8 md:mt-0 md:items-start md:text-left">
                {/* Name */}
                <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
                  {coach.name}
                </h1>
                {/* Headline */}
                <div className="mt-4 inline-flex items-center justify-center space-x-2 text-neutral-900   px-2.5 py-1.5 text-sm font-medium">
                  <h2>{coach.headline}</h2>
                </div>
              </div>
            </div>
            {/* About Me */}
            {/* <div className="hidden md:block">hey</div> */}
            <section className=" hidden md:block mt-4 md:w-[450px] lg:w-[800px]">
              <h2 className="mb-2 font-semibold text-lg">About Me</h2>

              <div className="flex items-center w-full">
                {coach.aboutMe && coach.aboutMe[0]?.children && (
                  <div
                    className="text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: coach.aboutMe[0].children[0]?.text,
                    }}
                  />
                )}
              </div>
            </section>

            {/* </div> */}
            {/* Logos*/}
            <section className="mt-4">
              <div className="mt-2 flex flex-wrap items-center justify-start gap-2">
                {coach.workHistory &&
                  coach.workHistory.map((workHistoryItem, index) => (
                    <div key={index} className="mb-4 mt-2">
                      <Badge variant={"outline"}>
                        <img
                          alt={`${workHistoryItem.companyName} Logo`}
                          loading="lazy"
                          width="16"
                          height="16"
                          decoding="async"
                          data-nimg="1"
                          className="object-contain shrink-0 rounded-full h-7 w-7 mr-1"
                          src={`https://logo.clearbit.com/${workHistoryItem.companyName}.com?size=200&w=64&q=75`}
                        />
                        <p className="sm:whitespace-nowrap">
                          {workHistoryItem.companyName}
                        </p>
                      </Badge>
                    </div>
                  ))}
              </div>
            </section>
            <br />
            {/* CTA  */}
            {/* <div className="absolute top-60 right-0 p-4"> */}

            <div className="">
              <CoachCTACard />

              <div className="ml-2 mt-4 inline-flex items-center justify-center text-neutral-900   px-2.5 py-1.5 text-sm font-medium">
                Hourly rate
              </div>
              <Badge className="ml-2 w-16 bg-purple-300 text-neutral-600 rounded-md">{` ${formatPrice(
                coach.hourlyRate
              )}/hr`}</Badge>

              <div className="ml-4 mt-6 font-semibold text-sm">
                {coach.name.split(" ")[0]} can help with:
              </div>
              <div className="flex mt-2  p-2 ">
                {coach.focusAreas.map((area, index) => (
                  <Badge
                    className="ml-2 font-normal text-[10px]"
                    variant={"ghost"}
                    key={index}
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            <section className="mt-4">
              {/* Free Introduction CTA */}
              <FreeIntroductionCTA
                coachName={coach.name}
                selectedLabel={selectedLabel}
                hasFreeIntroduction={
                  coach.freeIntroductionOption?.[0]?.freeIntroChoice === true
                }
              />
              <section className="  md:hidden mt-4 md:w-[600px] lg:w-[801px] xl:w-[834px]">
                <h2 className="mb-2 font-semibold text-lg">About Me</h2>

                <div className="flex items-center w-full">
                  {coach.aboutMe && coach.aboutMe[0]?.children && (
                    <div
                      className="text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: coach.aboutMe[0].children[0]?.text,
                      }}
                    />
                  )}
                </div>
              </section>
            </section>
            {/* Portfolio */}
            <MyCarousel portfolios={coach.portfolios} />
            {/* Coaching Package */}
            <MyCoachingPackage coachingPackages={coach.coachingPackages} />
            {/* Work experience */}
            <MyWorkExperience workHistory={coach.workHistory} />
            {/* Why I Coach */}
            {coach.whyICoach !== undefined && coach.whyICoach !== "" && (
              <WhyDoICoach whyICoach={coach.whyICoach} />
            )}
            {/* FAQ's */}
            <section className="mt-12 md:w-[600px]  lg:w-[801px]">
              <h2 className="font-semibold mb-4 text-lg">
                {coach.name.split(" ")[0]}'s FAQs
              </h2>
              {console.log("FAQs:", coach.FAQs)}
              {coach.FAQs && (
                <Accordion type="single" collapsible>
                  {coach.FAQs.map((faq, index) => (
                    <AccordionItem
                      className="text-sm"
                      key={index}
                      value={`item-${index}`}
                    >
                      <AccordionTrigger>{faq.faqQuestion}</AccordionTrigger>
                      <AccordionContent>{faq.faqAnswer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </section>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
