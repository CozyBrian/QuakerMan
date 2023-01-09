import { useEffect, useRef, useState } from "react";
import {
  addHours,
  addMonths,
  addYears,
  format,
  getDay,
  getDaysInMonth,
  isEqual,
  setHours,
  setMinutes,
  subHours,
  subMonths,
  subYears,
} from "date-fns";
import Calender from "./assets/calender.png";
import LeftArrow from "./assets/leftarrow.png";
import RightArrow from "./assets/rightarrow.png";
import useMouseOverCallback from "./hooks/useMouseOverCallback";

type PickerModeType = "date" | "month";

type dateTimePickerProps = {
  onChange: (date: Date) => void;
};

const DateTimePicker = ({ onChange }: dateTimePickerProps) => {
  const PickerRef = useRef(null);
  const [showCalender, setShowCalender] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [mode, setMode] = useState<PickerModeType>("date");

  useMouseOverCallback(PickerRef, () => {
    setShowCalender(false);
    setShowTimePicker(false);
  });

  const decrement = () => {
    switch (mode) {
      case "date":
        setDatePickerDate((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatePickerDate((prev) => subYears(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (mode) {
      case "date":
        setDatePickerDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatePickerDate((prev) => addYears(prev, 1));
        break;
    }
  };

  const isToday = (date: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );

  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(
        datePickerDate.getFullYear(),
        datePickerDate.getMonth(),
        date,
        selectedDate.getHours(),
        selectedDate.getMinutes()
      )
    );
    setShowCalender(false);
  };

  const getDayCount = (date: Date) => {
    let daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );

  const setMonthValue = (month: number) => () => {
    setDatePickerDate(
      new Date(
        datePickerDate.getFullYear(),
        month,
        datePickerDate.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes()
      )
    );
    setMode("date");
  };

  const incrementTime = (type: "hour" | "minute") => {
    switch (type) {
      case "hour":
        setSelectedDate((prev) => {
          const hours = prev.getHours();
          if (hours === 23) {
            return setHours(prev, 0);
          } else {
            return setHours(prev, hours + 1);
          }
        });
        break;
      case "minute":
        setSelectedDate((prev) => {
          const minutes = prev.getMinutes();
          if (minutes === 59) {
            return setMinutes(prev, 0);
          } else {
            return setMinutes(prev, minutes + 1);
          }
        });
        break;
    }
  };

  const decrementTime = (type: "hour" | "minute") => {
    switch (type) {
      case "hour":
        setSelectedDate((prev) => {
          const hours = prev.getHours();
          if (hours === 0) {
            return setHours(prev, 23);
          } else {
            return setHours(prev, prev.getHours() - 1);
          }
        });
        break;
      case "minute":
        setSelectedDate((prev) => {
          const minutes = prev.getMinutes();
          if (minutes === 0) {
            return setMinutes(prev, 59);
          } else {
            return setMinutes(prev, minutes - 1);
          }
        });
        break;
    }
  };

  const toggleAMPM = () => {
    let hours = selectedDate.getHours();

    if (hours >= 12) {
      setSelectedDate((prev) => subHours(prev, 12));
    } else {
      setSelectedDate((prev) => addHours(prev, 12));
    }
  };

  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    const now = new Date();
    setSelectedDate(now);
    setDatePickerDate(now);
  }, []);

  useEffect(() => {
    getDayCount(datePickerDate);
  }, [datePickerDate]);

  useEffect(() => {
    onChange(selectedDate);
  }, [selectedDate, onChange]);

  return (
    <div
      ref={PickerRef}
      className="relative flex flex-row justify-between items-center w-[256px] border-2 border-gray-200 bg-white rounded-md  px-2 py-1 flex-grow-0 z-30"
    >
      <div className="flex flex-row gap-2 text-gray-600 font-medium">
        <div>{format(selectedDate, "dd-MM-yyyy")}</div>
        <div
          onClick={() => {
            if (showCalender) {
              setShowCalender(false);
              setShowTimePicker(true);
            } else {
              setShowTimePicker(!showTimePicker);
            }
          }}
          className="hover:bg-slate-200 rounded-md px-0.5 cursor-pointer"
        >
          {format(selectedDate, "hh:mm")} {format(selectedDate, "a")}
        </div>
      </div>
      <div
        onClick={() => {
          if (showTimePicker) {
            setShowTimePicker(false);
            setShowCalender(true);
          } else {
            setShowCalender(!showCalender);
          }
        }}
        className="flex w-6 h-6 aspect-square items-center justify-center"
      >
        <img className="w-full" src={Calender} alt="cal-icon" />
      </div>
      {showTimePicker && (
        <div className="absolute flex flex-col justify-center items-center top-12 left-0 w-[256px] p-2 bg-white border-2 border-gray-00 rounded-xl">
          <div></div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row text-5xl items-center">
              <div className="flex flex-col justify-center gap-2">
                <button
                  onClick={() => incrementTime("hour")}
                  className="text-base bg-gray-200 rounded-lg hover:bg-gray-300 duration-150"
                >
                  +
                </button>
                <div className="flex justify-center items-center p-2 bg-gray-200 rounded-xl">
                  {format(selectedDate, "hh")}
                </div>
                <button
                  onClick={() => decrementTime("hour")}
                  className="text-base bg-gray-200 rounded-lg hover:bg-gray-300 duration-150"
                >
                  -
                </button>
              </div>
              :
              <div className="flex flex-col justify-center gap-2">
                <button
                  onClick={() => incrementTime("minute")}
                  className="text-base bg-gray-200 rounded-lg hover:bg-gray-300 duration-150"
                >
                  +
                </button>
                <div className="flex justify-center items-center p-2 bg-gray-200 rounded-xl">
                  {format(selectedDate, "mm")}
                </div>
                <button
                  onClick={() => decrementTime("minute")}
                  className="text-base bg-gray-200 rounded-lg hover:bg-gray-300 duration-150"
                >
                  -
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button
                onClick={toggleAMPM}
                className="text-base bg-gray-200 rounded-lg hover:bg-gray-300 duration-150"
              >
                +
              </button>
              <div className="flex justify-center items-center text-2xl p-2 bg-gray-200 rounded-xl">
                {format(selectedDate, "a")}
              </div>
              <button
                onClick={toggleAMPM}
                className="text-base bg-gray-200 rounded-lg hover:bg-gray-300 duration-150"
              >
                -
              </button>
            </div>
          </div>
          <div></div>
        </div>
      )}
      {showCalender && (
        <div className="absolute flex flex-col top-12 left-0 w-[256px] bg-white border-2 border-gray-00 rounded-xl">
          <div className="flex flex-row w-full items-center justify-between p-2">
            <button
              onClick={decrement}
              className="p-1 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <img
                className="w-6 aspect-square"
                src={LeftArrow}
                alt="left-icon"
              />
            </button>
            <div className="flex flex-row gap-1 w-full text-center">
              {mode === "date" && (
                <div
                  onClick={() => setMode("month")}
                  className="px-3 p-1 text-lg font-medium hover:bg-gray-200 uppercase rounded-lg"
                >
                  {format(datePickerDate, "MMMM")}
                </div>
              )}
              <div className="px-3 p-1 text-lg font-medium hover:bg-gray-200 rounded-lg w-full">
                {format(datePickerDate, "yyyy")}
              </div>
            </div>
            <button
              onClick={increment}
              className="p-1 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <img
                className="w-6 aspect-square"
                src={RightArrow}
                alt="right-icon"
              />
            </button>
          </div>
          {mode === "date" && (
            <div className="flex flex-col w-full p-2">
              <div className="flex flex-wrap mb-3 -mx-1">
                {DAYS.map((day, index) => (
                  <div key={index} style={{ width: "14.26%" }} className="px-1">
                    <p className="text-sm text-center" key={`day-${index}`}>
                      {day}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-1">
                {blankDays.map((_, i) => (
                  <div
                    key={i}
                    style={{ width: "14.26%" }}
                    className="text-center border p-1 border-transparent text-sm"
                  ></div>
                ))}
                {dayCount.map((d, i) => (
                  <div
                    key={i}
                    style={{ width: "14.26%" }}
                    className="px-1 mb-1"
                  >
                    <div
                      onClick={setDateValue(d)}
                      className={`cursor-pointer text-center text-sm rounded-lg leading-loose transition ease-in-out duration-100 ${
                        isToday(d)
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {mode === "month" && (
            <div className="flex flex-wrap -mx-1 p-2">
              {Array(12)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    onClick={setMonthValue(i)}
                    style={{ width: "25%" }}
                  >
                    <div
                      className={`flex justify-center items-center cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                        isSelectedMonth(i)
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {format(
                        new Date(
                          datePickerDate.getFullYear(),
                          i,
                          datePickerDate.getDate()
                        ),
                        "MMM"
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
