function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
    // Fixed length k reduces the search to picking starts: window[s] is the
    // sum of nums[s..s+k), and an answer is a triple (i, j, l) with
    // i + k <= j and j + k <= l maximizing window[i] + window[j] + window[l].
    // left[s] tracks the largest window over starts [0..s], kept at the
    // SMALLEST index on ties, and right[s] the same over [s..m-1] — each
    // middle j therefore pairs with the lexicographically best flanks
    // available to it.
    const n = nums.length;
    const m = n - k + 1;
    const window: number[] = new Array<number>(m).fill(0);
    let total = 0;
    for (let s = 0; s < k; ++s) {
        total += nums[s];
    }
    window[0] = total;
    for (let s = 1; s < m; ++s) {
        total += nums[s + k - 1] - nums[s - 1];
        window[s] = total;
    }
    const left: number[] = new Array<number>(m).fill(0);
    for (let s = 1; s < m; ++s) {
        left[s] = window[left[s - 1]] >= window[s] ? left[s - 1] : s;
    }
    const right: number[] = new Array<number>(m).fill(0);
    right[m - 1] = m - 1;
    for (let s = m - 2; s >= 0; --s) {
        right[s] = window[s] >= window[right[s + 1]] ? s : right[s + 1];
    }
    // Strict improvement only, so the FIRST middle achieving the maximum
    // survives the sweep — which is the lexicographic rule: with j fixed the
    // flanks are independent, and mixing a smaller flank into a smaller
    // middle only ever produces a lexicographically smaller optimum, so the
    // global answer sits at the minimal middle. Every window sum is at least
    // k, so -1 sits below any real total, and every value in play stays far
    // inside the range doubles hold exactly.
    let bestTotal = -1;
    let best: number[] = [0, 0, 0];
    for (let j = k; j <= n - 2 * k; ++j) {
        const i = left[j - k];
        const l = right[j + k];
        total = window[i] + window[j] + window[l];
        if (total > bestTotal) {
            bestTotal = total;
            best = [i, j, l];
        }
    }
    return best;
}
