function numberOfWays(s: string): number {
    // Max ways ~ 4.2e13 < 2^53, so plain numbers stay exact.
    let zeros = 0,
        ones = 0,
        seq01 = 0,
        seq10 = 0,
        total = 0;
    for (const ch of s) {
        if (ch === "0") {
            total += seq10;
            seq01 += ones;
            zeros += 1;
        } else {
            total += seq01;
            seq10 += zeros;
            ones += 1;
        }
    }
    return total;
}
