"use client";

import { Button } from "@/components/tremor/Button";
import { DatePicker } from "@/components/tremor/DatePicker";
import addHours from "@/utils/add-hours";
import getSimpleDateString from "@/utils/get-simple-date-string";
import toUtcBiasedDate from "@/utils/to-utc-biased-date";
import { useCallback, useContext, useEffect } from "react";
import { DateContext } from "../_context/date-context";
import { SelectionContext } from "../_context/selection-context";
import memberTimezones from "../_data/member-timezones";
import { getTimezoneForCountry } from "./members";

export const DateTimePicker = ({
  format,
  formatButtons,
}: {
  format: number;
  formatButtons: JSX.Element[];
}) => {
  const [{ date: value }, _setValue] = useContext(DateContext);
  const [selection] = useContext(SelectionContext);

  const selectedMemberTimezone = useCallback(
    (date?: Date) =>
      getTimezoneForCountry(
        memberTimezones[selection as keyof typeof memberTimezones].country,
        date || new Date()
      ),
    [selection]
  );
  const dateStr = getSimpleDateString(value || new Date(0), format);

  const defaultSetValue = (date: Date | undefined) => {
    if (!date) {
      // REVIEW //  || !selectedMemberTimezone
      return _setValue({
        date: new Date(0),
        bias: selectedMemberTimezone(new Date(0)),
      });
    }

    _setValue({
      date,
      bias: selectedMemberTimezone(date),
    });
  };

  const setValue = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        // REVIEW //  || !selectedMemberTimezone
        return _setValue({
          date: new Date(0),
          bias: selectedMemberTimezone(new Date(0)),
        });
      }

      const biasedDate = addHours(
        toUtcBiasedDate(date),
        selectedMemberTimezone(date)
      );
      _setValue({
        date: biasedDate,
        bias: selectedMemberTimezone(date),
      });
    },
    [_setValue, selectedMemberTimezone]
  );

  useEffect(() => {
    setValue(new Date());
  }, [setValue]);

  const datetimeButtons = (
    <>
      <Button variant="primary" onClick={() => setValue(undefined)}>
        Reset
      </Button>
      <Button variant="secondary" onClick={() => setValue(new Date())}>
        Now
      </Button>
    </>
  );

  return (
    <>
      <div className="flex flex-col gap-3 w-full mt-3">
        <DatePicker
          showTimePicker
          value={value}
          onChange={defaultSetValue}
          className="w-full"
        />
        <div className="flex sm:hidden items-center flex-wrap gap-2 ml-auto mr-auto">
          {datetimeButtons}
        </div>
        <div className="flex justify-end gap-2 items-center flex-wrap">
          <span className="mr-auto text-4xl text-[#9a91ff] font-bold">
            {dateStr}
          </span>
          <div className="hidden sm:flex items-center flex-wrap gap-2">
            {datetimeButtons}
          </div>
          <div className="flex sm:hidden items-center flex-wrap">
            {formatButtons}
          </div>
        </div>
      </div>
    </>
  );
};
