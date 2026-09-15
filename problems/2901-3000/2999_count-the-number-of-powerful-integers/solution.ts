function numberOfPowerfulInt(start: number, finish: number, limit: number, s: string): number {
    function pow10(e: number): number {
        let r = 1;
        for (let i = 0; i < e; i++) r *= 10;
        return r;
    }

    function countExactLen(p: number, cap: number, lim: number): number {
        if (cap < pow10(p - 1)) return 0;
        if (cap >= pow10(p) - 1) return lim * Math.pow(lim + 1, p - 1);
        const capDigits: number[] = String(cap).split("").map(Number);

        const memo: number[] = new Array(2 * (p + 1)).fill(-1);
        function dp(pos: number, tight: boolean): number {
            if (pos === p) return 1;
            const key = pos * 2 + (tight ? 1 : 0);
            if (memo[key] >= 0) return memo[key];
            const up = tight ? capDigits[pos] : 9;
            const lo = pos === 0 ? 1 : 0;
            let total = 0;
            const hi = Math.min(up, lim);
            for (let d = lo; d <= hi; d++) {
                total += dp(pos + 1, tight && d === up);
            }
            memo[key] = total;
            return total;
        }

        return dp(0, true);
    }

    function countPowerful(x: number): number {
        if (x <= 0) return 0;
        const n = String(x).length;
        const lenS = s.length;
        if (lenS > n) return 0;
        const sv = Number(s);
        if (x < sv) return 0;
        const cap = Math.floor((x - sv) / pow10(lenS));
        let total = 1; // the number s itself (empty prefix)
        for (let p = 1; p <= n - lenS; p++) {
            total += countExactLen(p, cap, limit);
        }
        return total;
    }

    return countPowerful(finish) - countPowerful(start - 1);
}
