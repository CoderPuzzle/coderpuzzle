function largestCombination(candidates: number[]): number {
    const counts = new Array<number>(24).fill(0);
    for (const value of candidates) {
        for (let bit = 0; bit < 24; bit++) {
            if ((value >> bit) & 1) {
                counts[bit]++;
            }
        }
    }
    return Math.max(...counts);
}
