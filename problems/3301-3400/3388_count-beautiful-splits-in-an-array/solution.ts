function beautifulSplits(nums: number[]): number {
    const n = nums.length;
    if (n < 3) return 0;
    const W = n + 1;
    // lcp[i][j] = longest common prefix of nums[i:] and nums[j:]
    const lcp = new Uint16Array(W * W);
    for (let i = n - 1; i >= 0; i--) {
        const row = i * W;
        const nextRow = (i + 1) * W;
        const ni = nums[i]!;
        for (let j = n - 1; j > i; j--) {
            if (ni === nums[j]!) {
                lcp[row + j] = lcp[nextRow + j + 1] + 1;
            }
        }
    }

    let count = 0;
    for (let i = 1; i < n - 1; i++) {
        // i = end of nums1, start of nums2
        let jEnd: number;
        // Case A: nums1 is a prefix of nums2 => j >= 2*i and nums[0:i] == nums[i:2i]
        if (lcp[i] >= i && 2 * i <= n - 1) {
            count += n - 2 * i;
            jEnd = 2 * i;
        } else {
            jEnd = n;
        }
        // Case B: nums2 is a prefix of nums3, counting only j not already covered by A
        const row = i * W;
        for (let j = i + 1; j < jEnd; j++) {
            const L = j - i;
            if (lcp[row + j] >= L && n - j >= L) {
                count++;
            }
        }
    }
    return count;
}
