function validSubarrays(nums: number[], k: number): number {
    // Each peak is the only peak in exactly those subarrays whose left
    // endpoint stays past the previous peak and whose right endpoint stays
    // before the next peak, both also within k of the peak. The count can
    // reach (n/2+1)*(n/2) ~ 2.5*10^9 on a single-peaked array, far inside
    // the 2^53 range where plain numbers are exact.
    const n = nums.length;
    const peaks: number[] = [];
    for (let i = 1; i < n - 1; i++) {
        if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
            peaks.push(i);
        }
    }
    let total = 0;
    for (let idx = 0; idx < peaks.length; idx++) {
        const i = peaks[idx];
        const prev = idx > 0 ? peaks[idx - 1] : -1;
        const nxt = idx + 1 < peaks.length ? peaks[idx + 1] : n;
        const lo = Math.max(i - k, prev + 1);
        const hi = Math.min(i + k, nxt - 1);
        total += (i - lo + 1) * (hi - i + 1);
    }
    return total;
}
