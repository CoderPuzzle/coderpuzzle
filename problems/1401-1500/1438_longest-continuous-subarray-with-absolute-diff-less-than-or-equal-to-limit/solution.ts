function longestSubarray(nums: number[], limit: number): number {
    const n = nums.length;
    const maxq: number[] = new Array(n).fill(0);
    const minq: number[] = new Array(n).fill(0);
    let mh = 0,
        mt = 0,
        sh = 0,
        st = 0;
    let left = 0;
    let best = 0;
    for (let right = 0; right < n; right++) {
        const x = nums[right];
        while (mt > mh && nums[maxq[mt - 1]] <= x) {
            mt--;
        }
        maxq[mt++] = right;
        while (st > sh && nums[minq[st - 1]] >= x) {
            st--;
        }
        minq[st++] = right;
        while (nums[maxq[mh]] - nums[minq[sh]] > limit) {
            if (maxq[mh] === left) {
                mh++;
            }
            if (minq[sh] === left) {
                sh++;
            }
            left++;
        }
        if (right - left + 1 > best) {
            best = right - left + 1;
        }
    }
    return best;
}
