const MOD = 1000000007n;

function getFinalState(nums: number[], k: number, multiplier: number): number[] {
    const n = nums.length;
    const result = new Array<number>(n);
    if (multiplier === 1) {
        // x * 1 == x forever: no operation ever moves a value.
        for (let i = 0; i < n; i++) {
            result[i] = nums[i] % 1000000007;
        }
        return result;
    }

    // Min-heap of [value, index] pairs ordered lexicographically.
    const before = (a: number[], b: number[]): boolean => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]);
    const items: number[][] = [];
    const push = (item: number[]): void => {
        items.push(item);
        for (let child = items.length - 1; child > 0;) {
            const parent = (child - 1) >> 1;
            if (!before(items[child], items[parent])) {
                break;
            }
            [items[parent], items[child]] = [items[child], items[parent]];
            child = parent;
        }
    };
    const pop = (): number[] => {
        const top = items[0];
        const last = items.pop();
        if (items.length > 0) {
            items[0] = last;
            for (let parent = 0; ;) {
                const left = parent * 2 + 1;
                const right = left + 1;
                let first = parent;
                if (left < items.length && before(items[left], items[first])) {
                    first = left;
                }
                if (right < items.length && before(items[right], items[first])) {
                    first = right;
                }
                if (first === parent) {
                    break;
                }
                [items[parent], items[first]] = [items[first], items[parent]];
                parent = first;
            }
        }
        return top;
    };

    nums.forEach((value, index) => push([value, index]));
    let top = nums[0];
    for (const value of nums) {
        if (value > top) {
            top = value;
        }
    }
    // Simulate while the product stays within max(nums): every applied
    // value then lands at or below top, so top itself never grows and each
    // element is multiplied at most log2(top) times in this phase. Both
    // sides stay exact as Numbers: heap values are <= 10^9 and the
    // crossover product is <= 10^9 * 10^6 = 10^15 < 2^53.
    while (k > 0 && items[0][0] * multiplier <= top) {
        const [value, index] = pop();
        push([value * multiplier, index]);
        k--;
    }
    const powMod = (base: bigint, exponent: bigint): bigint => {
        let answer = 1n;
        let factor = base % MOD;
        while (exponent > 0n) {
            if ((exponent & 1n) === 1n) {
                answer = (answer * factor) % MOD;
            }
            factor = (factor * factor) % MOD;
            exponent >>= 1n;
        }
        return answer;
    };
    if (k > 0) {
        // Crossover reached: multiplying the smallest now lifts it above
        // everything else, so later operations cycle through the entries in
        // non-decreasing (value, index) order. Each round scales all n
        // values by the multiplier, which preserves that inequality, so the
        // leftover k operations split into q full rounds plus one extra
        // exponent for the first rem entries of the sorted order.
        const ordered = [...items].sort((a, b) => (a[0] !== b[0] ? (a[0] < b[0] ? -1 : 1) : a[1] - b[1]));
        const q = Math.floor(k / n);
        const rem = k % n;
        for (let pos = 0; pos < n; pos++) {
            const [value, index] = ordered[pos];
            const exponent = BigInt(q + (pos < rem ? 1 : 0));
            result[index] = Number((BigInt(value) * powMod(BigInt(multiplier), exponent)) % MOD);
        }
    } else {
        for (const [value, index] of items) {
            result[index] = value % 1000000007;
        }
    }
    return result;
}
