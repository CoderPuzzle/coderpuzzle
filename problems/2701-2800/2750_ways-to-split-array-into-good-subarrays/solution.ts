function numberOfGoodSubarraySplits(nums: number[]): number {
    const MOD = 1000000007;
    const mulmod = (a: number, b: number): number => Number((BigInt(a) * BigInt(b)) % BigInt(MOD));
    let answer = 0;
    let prev = -1; // index of the previous 1; -1 means none seen yet
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            if (prev === -1) {
                // First 1 found: the array is splittable, empty product = 1.
                answer = 1;
            } else {
                // BigInt keeps the modular multiplication exact.
                answer = mulmod(answer, i - prev);
            }
            prev = i;
        }
    }
    return answer;
}
