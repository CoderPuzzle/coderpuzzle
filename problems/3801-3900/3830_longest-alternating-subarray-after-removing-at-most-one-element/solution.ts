function longestAlternating(nums: number[]): number {
    // Elements are <= 10^5 and every table value, candidate, and the
    // answer stay within 2 * 10^5, so plain numbers hold every integer
    // here exactly, far inside the 2^53 range. inc/dec: longest
    // alternating subarray ending at i, last comparison < / >;
    // rinc/rdec: the same starting at j, by first comparison.
    const n = nums.length;
    const inc: number[] = new Array(n).fill(1);
    const dec: number[] = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        if (nums[i - 1] < nums[i]) {
            inc[i] = dec[i - 1] + 1;
        } else if (nums[i - 1] > nums[i]) {
            dec[i] = inc[i - 1] + 1;
        }
    }
    const rinc: number[] = new Array(n).fill(1);
    const rdec: number[] = new Array(n).fill(1);
    for (let j = n - 2; j >= 0; j--) {
        if (nums[j] < nums[j + 1]) {
            rinc[j] = rdec[j + 1] + 1;
        } else if (nums[j] > nums[j + 1]) {
            rdec[j] = rinc[j + 1] + 1;
        }
    }
    let best = 1;
    for (let i = 0; i < n; i++) {
        if (inc[i] > best) {
            best = inc[i];
        }
        if (dec[i] > best) {
            best = dec[i];
        }
    }
    // Removing nums[r] only helps when the subarray spans it: the bridge
    // comparison nums[r-1] vs nums[r+1] must alternate with both edge
    // comparisons; equal neighbours bridge nothing.
    for (let r = 1; r < n - 1; r++) {
        let cand: number;
        if (nums[r - 1] < nums[r + 1]) {
            cand = dec[r - 1] + rdec[r + 1];
        } else if (nums[r - 1] > nums[r + 1]) {
            cand = inc[r - 1] + rinc[r + 1];
        } else {
            continue;
        }
        if (cand > best) {
            best = cand;
        }
    }
    return best;
}
