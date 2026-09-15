function haveConflict(event1: string[], event2: string[]): boolean {
    // Each "HH:MM" is one minute-of-day integer, so each event is an
    // inclusive integer interval. Two inclusive intervals intersect
    // exactly when neither starts after the other ends.
    const toMinutes = (time: string): number => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
    const start1 = toMinutes(event1[0]);
    const end1 = toMinutes(event1[1]);
    const start2 = toMinutes(event2[0]);
    const end2 = toMinutes(event2[1]);
    return start1 <= end2 && start2 <= end1;
}
