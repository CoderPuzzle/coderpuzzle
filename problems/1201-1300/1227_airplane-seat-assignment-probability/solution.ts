function nthPersonGetsNthSeat(n: number): number {
    // The floating claim ends by taking seat 1 or seat n, each equally
    // likely; the last passenger wins exactly when seat 1 goes first.
    return n === 1 ? 1.0 : 0.5;
}
