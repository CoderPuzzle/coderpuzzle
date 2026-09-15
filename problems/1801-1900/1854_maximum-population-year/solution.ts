function maximumPopulation(logs: number[][]): number {
    // Difference array over years: +1 at birth, -1 at death; a prefix sweep
    // reconstructs each year's population.
    const delta = new Array<number>(2052).fill(0);
    for (const [birth, death] of logs) {
        delta[birth]++;
        delta[death]--;
    }
    let bestYear = 1950;
    let bestPop = -1;
    let cur = 0;
    for (let year = 1950; year <= 2050; year++) {
        cur += delta[year];
        if (cur > bestPop) {
            bestPop = cur;
            bestYear = year;
        }
    }
    return bestYear;
}
