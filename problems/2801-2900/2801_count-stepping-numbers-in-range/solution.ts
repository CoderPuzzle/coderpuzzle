function countSteppingNumbers(low: string, high: string): number {
    const MOD = 1000000007;

    // value - 1 on a digit string (value >= 1); borrows turn 0s into 9s and
    // the collapsed leading digit is stripped.
    const decrement = (value: string): string => {
        const digits = value.split("");
        let i = digits.length - 1;
        while (digits[i] === "0") {
            digits[i] = "9";
            i--;
        }
        digits[i] = String(Number(digits[i]) - 1);
        let first = 0;
        while (first < digits.length - 1 && digits[first] === "0") first++;
        return digits.slice(first).join("");
    };

    // Stepping numbers in [1, bound], mod MOD; bound "0" gives 0. Every value
    // stays a residue below 2^31, so Number arithmetic is exact throughout.
    const countUpTo = (bound: string): number => {
        if (bound === "0") return 0;
        const n = bound.length;
        // ways[m][d]: mod-count of ways to append m further digits after a
        // digit d, each differing by exactly 1 from its predecessor.
        const ways: number[][] = Array.from({ length: n }, () => new Array(10).fill(0));
        ways[0].fill(1);
        for (let m = 1; m < n; m++) {
            for (let d = 0; d < 10; d++) {
                let total = 0;
                if (d > 0) total = ways[m - 1][d - 1];
                if (d < 9) total += ways[m - 1][d + 1];
                ways[m][d] = total % MOD;
            }
        }
        let count = 0;
        // Every length below n: first digit 1..9 (no leading zero), then any
        // completion.
        for (let length = 1; length < n; length++) {
            for (let d = 1; d <= 9; d++) {
                count = (count + ways[length - 1][d]) % MOD;
            }
        }
        // Length n: walk the bound's digits under a tight flag. A smaller
        // digit at the first mismatching position settles the comparison; the
        // tail then completes in ways[n - 1 - i][choice] ways.
        let prev = -1;
        for (let i = 0; i < n; i++) {
            const digit = Number(bound[i]);
            for (let choice = i === 0 ? 1 : 0; choice < digit; choice++) {
                if (prev < 0 || Math.abs(choice - prev) === 1) {
                    count = (count + ways[n - 1 - i][choice]) % MOD;
                }
            }
            if (prev >= 0 && Math.abs(digit - prev) !== 1) {
                return count; // the equal-prefix chain is dead
            }
            prev = digit;
        }
        return (count + 1) % MOD; // the bound itself survived the walk
    };

    return (((countUpTo(high) - countUpTo(decrement(low))) % MOD) + MOD) % MOD;
}
