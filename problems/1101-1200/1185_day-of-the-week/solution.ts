function dayOfTheWeek(day: number, month: number, year: number): string {
    // Anchored: Jan 1 1971 was a Friday, so offset 0 maps to Friday.
    const names = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeap = (y: number): boolean => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);

    let days = 0;
    for (let y = 1971; y < year; y++) {
        days += isLeap(y) ? 366 : 365;
    }
    for (let m = 1; m < month; m++) {
        days += monthDays[m - 1];
        if (m === 2 && isLeap(year)) {
            days++;
        }
    }
    days += day - 1;
    return names[days % 7];
}
