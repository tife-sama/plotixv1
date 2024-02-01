"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import { Close } from "lucide-react";
import Image from "next/image";

const MyCarousel = ({ portfolios }) => {
  const [enlargedIndex, setEnlargedIndex] = useState(null);

  const handleItemClick = (index) => {
    setEnlargedIndex(index);
  };

  const handleCloseModal = () => {
    setEnlargedIndex(null);
  };

  useEffect(() => {
    // You can perform additional actions when enlargedIndex changes
  }, [enlargedIndex]);

  if (!portfolios || portfolios.length === 0) {
    return;
  }

  return (
    <div className="md:w-[600px]  lg:w-[801px]">
      <h1 className="font-semibold mt-5 mb-6 text-lg">Portfolio</h1>
      <Carousel className="justify-center items-center">
        <CarouselContent className="">
          {portfolios.map((item, index) => (
            <CarouselItem key={index} className="basis-3/5 lg:basis-1/2">
              <button
                className="cursor-pointer p-2"
                onClick={() => handleItemClick(index)}
              >
                <div className="aspect-w-1 aspect-h-2">
                  <div className="w-full h-full">
                    <Image
                      src={item.media?.sizes?.thumbnail?.url}
                      alt={`Portfolio Item ${index + 1}`}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {enlargedIndex !== null && (
        <AlertDialog open={true} onDismiss={handleCloseModal}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {portfolios[enlargedIndex].title}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div>
                <Image
                  src={portfolios[enlargedIndex].media?.url}
                  alt={`Portfolio Item ${enlargedIndex + 1}`}
                  className="max-w-full h-auto mb-3"
                />
                <p>{portfolios[enlargedIndex].description}</p>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCloseModal}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default MyCarousel;
