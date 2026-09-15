function minBitFlips(start: number, goal: number): number {
    let flips = 0;
    let diff = start ^ goal;
    while (diff !== 0) {
        diff &= diff - 1;
        flips += 1;
    }
    return flips;
}
