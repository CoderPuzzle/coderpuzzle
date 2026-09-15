function numPairsDivisibleBy60(time: number[]): number {
    // songs bucketed by duration % 60: only the remainders decide
    // whether two durations sum to a multiple of 60
    const counts: number[] = new Array(60).fill(0);
    let total = 0;
    for (const duration of time) {
        const remainder = duration % 60;
        // each pair is counted once, at its later member: match every
        // earlier song whose remainder completes r to 0 (mod 60); the
        // % 60 folds the self-complementary classes 0 and 30 in place
        total += counts[(60 - remainder) % 60];
        counts[remainder] += 1;
    }
    return total;
}
