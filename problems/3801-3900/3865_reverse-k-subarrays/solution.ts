function reverseSubarrays(nums: number[], k: number): number[] {
    // Each block holds m = n / k elements. A two-pointer sweep swaps
    // the ends of a block inward, mirroring the "Two Pointers" tag, and
    // the blocks are visited left to right; the copy keeps the input
    // array untouched.
    const m = nums.length / k;
    const result = nums.slice();
    for (let start = 0; start < nums.length; start += m) {
        let i = start;
        let j = start + m - 1;
        while (i < j) {
            const tmp = result[i];
            result[i] = result[j];
            result[j] = tmp;
            ++i;
            --j;
        }
    }
    return result;
}
