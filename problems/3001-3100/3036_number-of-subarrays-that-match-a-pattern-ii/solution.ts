function countMatchingSubarrays(nums: number[], pattern: number[]): number {
    // Reduce nums to its sign sequence s of length n - 1: s[t] is 1, 0,
    // or -1 according to nums[t + 1] vs nums[t]. Condition k of the match
    // definition is exactly s[i + k] == pattern[k], so the window starting
    // at i matches iff pattern occurs in s at offset i. Counting windows
    // becomes substring search, linear with KMP.
    const signs: number[] = [];
    for (let t = 0; t + 1 < nums.length; t++) {
        signs.push(Math.sign(nums[t + 1] - nums[t]));
    }
    const m = pattern.length;
    const failure: number[] = new Array(m).fill(0);
    let matched = 0;
    for (let index = 1; index < m; index++) {
        while (matched > 0 && pattern[index] !== pattern[matched]) {
            matched = failure[matched - 1];
        }
        if (pattern[index] === pattern[matched]) {
            matched++;
        }
        failure[index] = matched;
    }
    let count = 0;
    matched = 0;
    for (const sign of signs) {
        while (matched > 0 && sign !== pattern[matched]) {
            matched = failure[matched - 1];
        }
        if (sign === pattern[matched]) {
            matched++;
        }
        if (matched === m) {
            // Full occurrence; fall back so overlaps keep counting.
            count++;
            matched = failure[matched - 1];
        }
    }
    return count;
}
