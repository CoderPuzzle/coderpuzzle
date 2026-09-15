function bestClosingTime(customers: string): number {
    // penalty at closing hour j = (#'N' in customers[:j]) + (#'Y' in customers[j:])
    let prefixN = 0;
    let suffixY = 0;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i] === "Y") suffixY++;
    }
    let bestJ = 0;
    let bestPenalty = prefixN + suffixY;
    for (let j = 1; j <= customers.length; j++) {
        if (customers[j - 1] === "N") prefixN++;
        else suffixY--;
        const penalty = prefixN + suffixY;
        if (penalty < bestPenalty) {
            bestPenalty = penalty;
            bestJ = j;
        }
    }
    return bestJ;
}
