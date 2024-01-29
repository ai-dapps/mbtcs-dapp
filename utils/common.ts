import moment from "moment";

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function comma(text: string | number | undefined) {
  let tempString: string;
  const temp = String(text);
  const strArr = temp.toString().split(".");
  tempString = strArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (strArr.length > 1) tempString = `${tempString}.${strArr[1]}`;

  return tempString;
}

export function dateToText(dateTime: number | string | Date) {
  const date = new Date(dateTime);
  const formattedDateTime = moment(date).format("YYYY.MM.DD HH:mm");
  return formattedDateTime;
}

export function isBetween(
  start: number | string | Date,
  end: number | string | Date
) {
  const now = moment();
  const startAt = moment(new Date(start));
  const endAt = moment(new Date(end));
  if (now.isBefore(startAt)) {
    return "Soon";
  } else if (now.isAfter(endAt)) {
    return "Ended";
  } else {
    return "Active";
  }
}
