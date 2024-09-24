"use client";

import addHours from "@/utils/add-hours";
import getDateString from "@/utils/get-date-string";
import getSimpleDateString from "@/utils/get-simple-date-string";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DateContext } from "../_context/date-context";
import { Selection } from "../_context/selection-context";
import memberTimezones from "../_data/member-timezones";
import { DateTimePicker } from "./datetime-picker";
import { getTimezoneForCountry } from "./members";

export default function Timezones({
  selectedMember,
}: {
  selectedMember: Selection;
}) {
  const activeButtonClasses = "bg-gray-200";
  const [format, _setFormat] = useState<number>(24);
  const setFormat = (newFormat: number) => () => {
    localStorage.setItem("format", newFormat.toString());
    _setFormat(newFormat);
  };
  useEffect(() => {
    const savedFormat = Number(localStorage.getItem("format"));
    if (savedFormat === 12 || savedFormat === 24) _setFormat(savedFormat);
  }, []);

  const [{ date: currentSelectedDate, bias }] = useContext(DateContext);

  const memberInfo =
    memberTimezones[selectedMember as keyof typeof memberTimezones];
  const memberTimezone = getTimezoneForCountry(
    memberInfo.country,
    currentSelectedDate || new Date()
  );

  const buttons = formatButtons.map((x, i) => (
    <button
      key={i}
      type="button"
      className={twMerge(
        "py-2 px-3 inline-flex items-center gap-x-2 -ms-px first:rounded-s-md first:ms-0 last:rounded-e-md text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        x === format && activeButtonClasses
      )}
      onClick={setFormat(x)}
    >
      {x}
    </button>
  ));

  return (
    <section className="z-10 w-[480px] max-w-full min-h-[300px] bg-[#5a5a61] rounded-2xl overflow-hidden">
      <header className="px-3 pt-4">
        <div className="flex items-center flex-wrap">
          {memberInfo.flagBig}
          <h2 className="text-xl sm:text-2xl font-extrabold pt-1 ml-3">
            {memberInfo.name}
          </h2>{" "}
          <span className="text-lg sm:text-xl font-light ml-1 pt-[0.35rem] opacity-80">
            (UTC +{memberTimezone.toString().padStart(2, "0")})
          </span>
          <div className="hidden sm:flex rounded-md shadow-sm ml-auto">
            {buttons}
          </div>
        </div>
        <div className="flex items-center flex-wrap">
          <DateTimePicker formatButtons={buttons} format={format} />
        </div>
      </header>
      <div className="bg-[#5a5a61] p-3 flex flex-col gap-2 rounded-b-2xl">
        {Object.keys(memberTimezones)
          .filter((x) => x !== selectedMember)
          .map((x, i) => {
            const member = memberTimezones[x as keyof typeof memberTimezones];
            const currentTimezone = getTimezoneForCountry(
              member.country,
              currentSelectedDate || new Date(0)
            );
            const value = currentSelectedDate || new Date(0);

            const biasDifference = currentTimezone - bias;

            const utcBiasedFixedDate = addHours(value, biasDifference);

            const utcBiasedSimpleDateStr = getSimpleDateString(
              utcBiasedFixedDate,
              format
            );
            const utcBiasedDateStr = getDateString(utcBiasedFixedDate);

            const component = (
              <article
                key={i}
                className="max-sm:grid-cols-1 max-sm:gap-1 max-sm:justify-center max-sm:pt-4 max-sm:pb-3 bg-[#484850] rounded-md p-2 px-4 grid gap-3 grid-cols-[minmax(auto,_max-content)_minmax(auto,_max-content)_auto_minmax(auto,_max-content)]"
              >
                <div className="text-center flex items-center justify-center">
                  {member.flag}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-lg max-sm:text-2xl max-sm:text-center max-sm:mb-1">
                    {member.name}
                  </span>
                  <span className="opacity-70 text-sm max-sm:text-center">
                    UTC +{currentTimezone.toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="text-center flex items-center justify-center">
                  {utcBiasedDateStr}
                </div>
                <div className="text-center flex items-center text-lg max-sm:text-2xl text-[#9a91ff] font-bold max-sm:justify-center">
                  {utcBiasedSimpleDateStr}
                </div>
              </article>
            );

            const timezone = currentTimezone;

            return { component, timezone };
          })
          .sort((a, b) => a.timezone - b.timezone)
          .map((x) => x.component)}
      </div>
    </section>
  );
}

const formatButtons = [12, 24];
