function countDaysTogether(arriveAlice: string, leaveAlice: string, arriveBob: string, leaveBob: string): number {
    // Month lengths of a non-leap year, turned into "days before month m"
    // so any "MM-DD" maps to one day-of-year integer.
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthStart = [0];
    for (let month = 1; month < 12; ++month) {
        monthStart.push(monthStart[month - 1] + monthDays[month - 1]);
    }
    const dayOfYear = (date: string): number => monthStart[Number(date.slice(0, 2)) - 1] + Number(date.slice(3));

    // Both stays are now integer intervals; the shared days are their
    // inclusive intersection, empty exactly when the bounds cross.
    const arrival = Math.max(dayOfYear(arriveAlice), dayOfYear(arriveBob));
    const departure = Math.min(dayOfYear(leaveAlice), dayOfYear(leaveBob));
    return Math.max(0, departure - arrival + 1);
}
