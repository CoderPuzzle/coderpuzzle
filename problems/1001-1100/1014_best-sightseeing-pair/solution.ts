function maxScoreSightseeingPair(values: number[]): number {
    let bestPrefix = values[0]; // max of values[i] + i seen so far
    let best = -Infinity;
    for (let j = 1; j < values.length; j++) {
        const score = bestPrefix + values[j] - j;
        if (score > best) {
            best = score;
        }
        if (values[j] + j > bestPrefix) {
            bestPrefix = values[j] + j;
        }
    }
    return best;
}
