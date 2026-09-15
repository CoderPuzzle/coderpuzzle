function findMinimumOperations(s1: string, s2: string, s3: string): number {
    // Deletions only ever shorten a string from the right, so the final
    // shared string is a prefix of each input — and it must be
    // non-empty. Every string is trimmed to the longest common prefix,
    // and each deletion is forced, so the operation count is the sum of
    // the three overshoot lengths.
    const limit = Math.min(s1.length, s2.length, s3.length);
    let common = 0;
    while (common < limit && s1[common] === s2[common] && s2[common] === s3[common]) {
        common += 1;
    }
    if (common === 0) {
        return -1;
    }
    return s1.length + s2.length + s3.length - 3 * common;
}
