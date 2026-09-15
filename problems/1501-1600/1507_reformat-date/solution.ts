function reformatDate(date: string): string {
    // Split on spaces to get the day (with its ordinal suffix), the
    // three-letter month, and the four-digit year.
    const [dayPart, monthPart, year] = date.split(" ");

    const months: Record<string, string> = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
    };

    // Every ordinal suffix (st/nd/rd/th) is exactly two letters, so
    // dropping the last two characters always leaves the bare digits.
    let day = dayPart.slice(0, -2);
    if (day.length === 1) {
        day = "0" + day;
    }

    return `${year}-${months[monthPart]}-${day}`;
}
