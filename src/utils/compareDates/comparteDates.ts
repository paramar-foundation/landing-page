interface TimeResult {
  time: number | string;
  unit: string;
}

export const compareDates = (
  targetDateString: string | Date | undefined,
  compareToDate: Date = new Date()
): TimeResult => {
  if (!targetDateString) {
    return {
      time: "-",
      unit: "-",
    };
  }

  const targetDate = new Date(targetDateString);
  const currentDate = compareToDate;
  const difference = currentDate.getTime() - targetDate.getTime();

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (minutes >= 0 && minutes <= 59) {
    return { time: minutes, unit: "minutes" };
  } else if (hours >= 1 && hours <= 24) {
    return { time: hours, unit: "hours" };
  } else if (days >= 1 && days <= 30) {
    return { time: days, unit: "days" };
  } else {
    const formattedDate = [
      targetDate.getMonth() - 1,
      targetDate.getDate(),
      targetDate.getFullYear(),
    ].join("/");

    return { time: formattedDate, unit: "-" };
  }
};
