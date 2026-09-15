function checkEqualPartitions(nums: number[], target: number): boolean {
    // Enumerate every proper subset as one side; the mask's complement is
    // the other side. Products stop early once they exceed target. JS
    // numbers stay exact here: target <= 1e15 < 2^53, and any product that
    // crosses 2^53 also crossed target, so the early exit fires on a value
    // that is decisively too large.
    const n = nums.length;
    const full = (1 << n) - 1;
    for (const x of nums) {
        if (target % x !== 0) {
            return false; // every element sits in a side, so each divides target
        }
    }
    const productWithin = (mask: number): number => {
        let product = 1;
        for (let i = 0; i < n; i++) {
            if (((mask >> i) & 1) === 1) {
                product *= nums[i];
                if (product > target) {
                    return -1;
                }
            }
        }
        return product;
    };
    for (let mask = 1; mask < full; mask++) {
        if (productWithin(mask) === target && productWithin(mask ^ full) === target) {
            return true;
        }
    }
    return false;
}
