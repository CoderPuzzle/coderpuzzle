function minCost(arr: number[], brr: number[], k: number): number {
    // Splitting into singleton blocks already realizes any permutation,
    // so one paid rearrangement is all Operation 1 can offer; matching
    // sorted to sorted then minimizes sum |a - b| over permutations. The
    // answer is the cheaper of leaving arr put and paying k plus that
    // matched cost. Costs reach 4 * 10^10, exact as JS numbers (< 2^53).
    let direct = 0;
    for (let i = 0; i < arr.length; i++) {
        direct += Math.abs(arr[i] - brr[i]);
    }
    const sa = [...arr].sort((a, b) => a - b);
    const sb = [...brr].sort((a, b) => a - b);
    let matched = k;
    for (let i = 0; i < sa.length; i++) {
        matched += Math.abs(sa[i] - sb[i]);
    }
    return Math.min(direct, matched);
}
