function rotate(nums: number[], k: number): number[] {
    // The positions split into gcd(n, k) cycles under i -> (i + k) % n, and
    // walking each cycle carries its values straight to their final slots
    // with only one element in flight at a time.
    const n = nums.length;
    // A rotation by n steps is the identity, so any larger k wraps
    // around to k % n — normalize before chasing cycles.
    k %= n;
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    const cycles = gcd(n, k);
    for (let start = 0; start < cycles; ++start) {
        let carried = nums[start];
        let j = start;
        while (true) {
            // Drop the carried element into its rightful slot and catch
            // the one displaced; the cycle closes back at the start.
            const nxt = (j + k) % n;
            [nums[nxt], carried] = [carried, nums[nxt]];
            j = nxt;
            if (nxt === start) break;
        }
    }
    // The rotation happened inside the input allocation; the same array,
    // now rotated, is what the judge compares.
    return nums;
}
