function modifyString(s: string): string {
    // Only 3 candidate letters and at most 2 neighbors to avoid, so one of
    // 'a', 'b', 'c' (tried in that fixed order) always works.
    const chars = s.split("");
    const n = chars.length;
    for (let i = 0; i < n; ++i) {
        if (chars[i] !== "?") {
            continue;
        }
        for (const candidate of ["a", "b", "c"]) {
            const leftOk = i === 0 || chars[i - 1] !== candidate;
            const rightOk = i === n - 1 || chars[i + 1] !== candidate;
            if (leftOk && rightOk) {
                chars[i] = candidate;
                break;
            }
        }
    }
    return chars.join("");
}
