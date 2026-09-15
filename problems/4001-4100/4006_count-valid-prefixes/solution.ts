function countValidPrefixes(s: string): number {
    // A prefix rearranges into an alternating string exactly when its counts
    // of '0' and '1' differ by at most one, so track both running counts
    // through one pass and count the prefixes whose balance stays within one.
    let zeros = 0;
    let ones = 0;
    let valid = 0;
    for (const ch of s) {
        if (ch === "0") {
            zeros += 1;
        } else {
            ones += 1;
        }
        if (Math.abs(zeros - ones) <= 1) valid += 1;
    }
    return valid;
}
