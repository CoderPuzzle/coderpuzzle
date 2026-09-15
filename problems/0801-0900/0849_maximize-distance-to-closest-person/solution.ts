function maxDistToClosest(seats: number[]): number {
    // One pass remembering the previous seated index. The empties
    // before the first person are best entered at seat 0, the empties
    // between two people at the middle of the gap.
    const n = seats.length;
    let prev = -1;
    let best = 0;
    for (let i = 0; i < n; ++i) {
        if (seats[i] === 1) {
            if (prev < 0) {
                // Leading empties: seat 0 is distance i from the person.
                best = i;
            } else {
                // Between two people: the middle of the gap wins.
                best = Math.max(best, Math.floor((i - prev) / 2));
            }
            prev = i;
        }
    }
    // Trailing empties: the far end of the row, seat n - 1.
    return Math.max(best, n - 1 - prev);
}
