function findKthSmallest(coins: number[], k: number): number {
    function gcd(a: number, b: number): number {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    const m = coins.length;

    function countLe(x: number): number {
        let total = 0;
        // inclusion-exclusion: each subset S contributes floor(x / lcm(S))
        for (let mask = 1; mask < 1 << m; mask++) {
            let l = 1;
            let bits = 0;
            let overflow = false;
            for (let j = 0; j < m; j++) {
                if ((mask >> j) & 1) {
                    const g = gcd(l, coins[j]);
                    l = Math.floor(l / g) * coins[j];
                    bits++;
                    // an lcm past x would only contribute 0; stop early
                    if (l > x) {
                        overflow = true;
                        break;
                    }
                }
            }
            if (overflow) {
                continue;
            }
            // odd subsets add, even subtract, so duplicates count once
            if (bits % 2 === 1) {
                total += Math.floor(x / l);
            } else {
                total -= Math.floor(x / l);
            }
        }
        return total;
    }

    // count(x) is monotone; the answer is the least x with count(x) >= k
    // (the k-th multiple of the smallest coin is a safe upper bound)
    let lo = 1;
    let hi = k * Math.min(...coins);
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (countLe(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
