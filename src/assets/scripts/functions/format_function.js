export function format_date(date_value, format) {
  const currentDate = new Date(date_value);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  if (format === "/") {
    const formatted_date_1 = `${month}/${day}/${year}`;
    return formatted_date_1;
  } else if (format === "-") {
    const formatted_date_2 = `${month}-${day}-${year}`;
    return formatted_date_2;
  } else {
    return "";
  }
}

export function format_time(date_value, format) {
  const customDate = new Date(date_value);

  if (format === "ampm") {
    const hours = customDate.getHours();
    const minutes = customDate.getMinutes();
    const seconds = customDate.getSeconds();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes).padStart(2, "0");

    const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
    return formattedTime;
  } else if (format === "military") {
    const hours = customDate.getHours();
    const minutes = customDate.getMinutes();
    const seconds = customDate.getSeconds();
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return formattedTime;
  } else {
    return "";
  }
}

export function format_raw_date(date_value, format) {
  const date = new Date(date_value);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  if (format === "/") {
    return `${month}/${day}/${year}`;
  } else {
    return `${month}-${day}-${year}`;
  }
}

export function get_unix_timestamp(date_value) {
  const current_date = new Date(date_value);
  return current_date.getTime();
}
