function checkZeroOnes(s: string): boolean {
    // One pass tracks the current run; each character's best run is
    // folded in on change and once more after the loop. A digit that
    // never appears keeps its best at 0, per the statement's rule.
    const best = [0, 0];
    let prev = " ";
    let cur = 0;
    for (const ch of s + " ") {
        if (ch === prev) {
            cur++;
        } else {
            if (prev === "0" || prev === "1") {
                best[prev === "1" ? 1 : 0] = Math.max(best[prev === "1" ? 1 : 0], cur);
            }
            cur = 1;
            prev = ch;
        }
    }
    return best[1] > best[0];
}
