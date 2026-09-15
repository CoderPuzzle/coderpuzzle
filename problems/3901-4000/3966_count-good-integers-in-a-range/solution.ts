function goodIntegers(l: number, r: number, k: number): number {
    const countGood = (x: number): number => {
        if (x < 0) return 0;
        const digits: number[] = String(x).split("").map(Number);
        const n = digits.length;
        // memo[pos][tight][prev+1][started]; prev index 0 = unused
        const memo: number[][][][] = Array.from({ length: n + 1 }, () =>
            Array.from({ length: 2 }, () => Array.from({ length: 11 }, () => new Array<number>(2).fill(-1))),
        );
        const dp = (pos: number, tight: number, prev: number, started: number): number => {
            if (pos === n) return 1;
            const slot = memo[pos][tight][prev + 1][started];
            if (slot !== -1) return slot;
            const limit = tight ? digits[pos] : 9;
            let total = 0;
            for (let d = 0; d <= limit; d++) {
                const ntight = tight && d === limit ? 1 : 0;
                if (!started && d === 0) {
                    total += dp(pos + 1, ntight, 0, 0);
                } else {
                    if (started && Math.abs(d - prev) > k) continue;
                    total += dp(pos + 1, ntight, d, 1);
                }
            }
            memo[pos][tight][prev + 1][started] = total;
            return total;
        };
        return dp(0, 1, 0, 0);
    };
    return countGood(r) - countGood(l - 1);
}
