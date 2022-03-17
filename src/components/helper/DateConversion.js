import moment from "moment";

export function convertDateFormat(date) {
  return moment(date).format("L");
}

export function convertTimeFormat(time) {
    return moment(time).format("hh:mm A");
}