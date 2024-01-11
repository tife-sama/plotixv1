"use client";
import React from "react";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Coaches } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import CoachListing from "./CoachListing";

interface CoachReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const CoachReel: React.FC<CoachReelProps> = (props) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteCoaches.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastpage) => lastpage.nextPage,
      }
    );

  const coaches = queryResults?.pages.flatMap((page) => page.items);

  let map: (Coaches | null)[] = [];
  if (coaches && coaches.length) {
    // At least one coach
    map = coaches;
  } else if (isLoading) {
    // Show skeleton loading cards
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-2-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-purple-600 hover:text-purple-500 md:block"
          >
            Check out more <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      {/* Card divs */}
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2  sm:gap-x-4 md:grid-cols-2 md:gap-y-10 lg:grid-cols-4 lg:gap-x-4">
            {map
              .slice()
              .reverse()
              .map((coaches, i) => (
                <div key={i} className="mb-6">
                  <CoachListing coaches={coaches} index={i} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachReel;
