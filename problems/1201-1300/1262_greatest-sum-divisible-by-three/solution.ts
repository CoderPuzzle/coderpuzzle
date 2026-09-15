function maxSumDivThree(nums: number[]): number {
    // best[r]: greatest prefix sum with sum % 3 == r (-1 = unreachable).
    const NEG = -1;
    let best: number[] = [0, NEG, NEG];
    for (const x of nums) {
        const candidate = [...best];
        for (let r = 0; r < 3; ++r) {
            if (best[r] !== NEG) {
                const nr = (r + x) % 3;
                if (best[r] + x > candidate[nr]) {
                    candidate[nr] = best[r] + x;
                }
            }
        }
        best = candidate;
    }
    return best[0];
}
