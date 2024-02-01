"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Coaches } from "@/collections/Coaches/Coaches";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { Ghost } from "lucide-react";
import Image from "next/image";

const MyCoachingPackage = ({ coachingPackages }) => {
  const [enlargedIndex, setEnlargedIndex] = useState(null);

  const handleItemClick = (index) => {
    setEnlargedIndex(index);
  };

  const handleCloseSheet = () => {
    setEnlargedIndex(null);
  };

  if (!coachingPackages || coachingPackages.length === 0) {
    return <div className="font-semibold mt-5 mb-4"></div>;
  }

  return (
    <div className="w-[400px] md:w-[600px] lg:w-[801px]">
      <div className="font-semibold mt-5 mb-6 text-lg">Coaching Packages</div>
      <Carousel className="">
        <CarouselContent className="-ml-1">
          {coachingPackages.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-3/5 lg:basis-1/2 cursor-pointer"
            >
              <div className="p-1" onClick={() => handleItemClick(index)}>
                <Card className="h-full flex flex-col justify-between">
                  <h1 className="text-center items-start justify-center mt-2">
                    Training Plan
                  </h1>
                  <CardContent className="flex items-start justify-center p-2 h-[200px]">
                    {" "}
                    {/* Set a fixed height for card content */}
                    <Image
                      src={item.coachingPackagePicture?.url}
                      alt={`Coaching Package ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </CardContent>
                  <p className="text-center items-start justify-center mt-2">
                    {item.title}
                    <span className="">{formatPrice(item.price)}</span>
                  </p>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {enlargedIndex !== null && (
        <Sheet
          open={enlargedIndex !== null}
          onDismiss={handleCloseSheet}
          style={{ width: "100%" }}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-10">
                {coachingPackages[enlargedIndex].title}
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <div>
                <Image
                  src={
                    coachingPackages[enlargedIndex].coachingPackagePicture?.url
                  }
                  alt={`Coaching Package ${enlargedIndex + 1}`}
                  className="w-full h-[200px] mb-3 rounded-md"
                />
                <p className="mt-2 mb-1">
                  {coachingPackages[enlargedIndex].description}
                </p>
                <p className="mt-1 mb-2 items-center justify-center text-center p-4 rounded">
                  Total Price
                  <span className="ml-2 font-semibold font-black ">
                    {`${formatPrice(coachingPackages[enlargedIndex].price)}`}{" "}
                    <hr className="mt-2 w-full" />
                  </span>
                </p>

                <p className="items-center justify-center text-center p-1 rounded">
                  {`${coachingPackages[enlargedIndex].time}`} Hrs
                  <span className="ml-2 font-semibold font-black ">
                    <hr className="mt-2 w-full" />
                  </span>
                </p>

                <p className="mt-1 mb-2 items-center justify-center text-center p-4 rounded">
                  {`${coachingPackages[enlargedIndex].numberOfSessions}`}{" "}
                  Sessions
                  <span className="ml-2 font-semibold font-black ">
                    <hr className="mt-2" />
                  </span>
                </p>
                <p className="mb-2 items-center justify-center text-center p-1 rounded">
                  This package focuses on:
                </p>
                <span className="ml-1 font-semibold font-black ">
                  <>
                    {coachingPackages[enlargedIndex].focusarea.map(
                      (area, index) => (
                        <Badge
                          variant={"secondary"}
                          key={index}
                          className="mr-1 mb-1"
                        >
                          {area}
                        </Badge>
                      )
                    )}
                  </>
                  <hr className="mt-2" />
                </span>
                <div className="text-center mt-6">
                  <Button className="w-full" type="submit">
                    Purchase
                  </Button>
                </div>
              </div>
            </SheetDescription>

            <SheetFooter className="mt-5 ">
              <button
                className="w-full border rounded p-2"
                onClick={handleCloseSheet}
              >
                Close
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default MyCoachingPackage;
