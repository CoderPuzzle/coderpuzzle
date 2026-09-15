function countFancy(l: number, r: number): number {
    // Strictly increasing numbers draw digits from 1..9; strictly decreasing
    // ones from 0..9 with no leading zero. Enumerate every nonempty digit
    // subset once per direction and deduplicate.
    const goodSet = new Set<number>();
    for (let mask = 1; mask < 1 << 9; mask++) {
        let num = 0;
        for (let d = 1; d <= 9; d++) {
            if (mask & (1 << (d - 1))) num = num * 10 + d;
        }
        goodSet.add(num);
    }
    for (let mask = 1; mask < 1 << 10; mask++) {
        let num = 0;
        for (let d = 9; d >= 0; d--) {
            if (mask & (1 << d)) num = num * 10 + d;
        }
        if (num > 0) goodSet.add(num);
    }
    const goods = Array.from(goodSet).sort((a, b) => a - b);

    // good[s] === 1 when the integer s is itself strictly monotone; those
    // are exactly the good digit sums (s in [1, 144]).
    const good: number[] = new Array(145).fill(0);
    for (const g of goodSet) {
        if (g <= 144) good[g] = 1;
    }
    const digitSum = (x: number): number => {
        let s = 0;
        while (x > 0) {
            s += x % 10;
            x = Math.floor(x / 10);
        }
        return s;
    };
    // overlap[i]: among goods[0..i), how many also have a good digit sum
    const overlap: number[] = new Array(goods.length + 1).fill(0);
    for (let i = 0; i < goods.length; i++) {
        overlap[i + 1] = overlap[i] + good[digitSum(goods[i])];
    }

    const countGood = (x: number): number => {
        let lo = 0;
        let hi = goods.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (goods[mid] <= x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    const countOverlap = (x: number): number => overlap[countGood(x)];

    const countSumGood = (x: number): number => {
        // Numbers in [1, x] whose digit sum is a good sum.
        if (x <= 0) return 0;
        const s = String(x);
        const n = s.length;
        // ways[k][t]: k free digits (0-9, leading zeros allowed) summing to
        // exactly t. Every count stays at most ~10^15, far inside Number's
        // exact 2^53 range, so plain numbers carry them exactly.
        const ways: number[][] = Array.from({ length: n + 1 }, () => new Array(145).fill(0));
        ways[0][0] = 1;
        for (let k = 1; k <= n; k++) {
            for (let t = 0; t <= 144; t++) {
                let total = 0;
                for (let d = 0; d <= 9; d++) {
                    if (t >= d) total += ways[k - 1][t - d];
                }
                ways[k][t] = total;
            }
        }
        let result = 0;
        let running = 0;
        for (let i = 0; i < n; i++) {
            const v = s.charCodeAt(i) - 48;
            const k = n - i - 1;
            // A smaller digit here fixes the prefix; the tail is free.
            for (let d = 0; d < v; d++) {
                const base = running + d;
                const limit = Math.min(9 * k, 144 - base);
                for (let rem = 0; rem <= limit; rem++) {
                    if (good[base + rem]) result += ways[k][rem];
                }
            }
            running += v;
        }
        if (good[running]) result += 1;
        return result;
    };

    const countFancyUpTo = (x: number): number => countSumGood(x) + countGood(x) - countOverlap(x);
    return countFancyUpTo(r) - countFancyUpTo(l - 1);
}
