function maxDepth(s: string): number {
    // s is guaranteed to be a VPS, so a running depth counter suffices:
    // '(' increments it, ')' decrements it, everything else is skipped.
    let depth = 0;
    let best = 0;
    for (const ch of s) {
        if (ch === "(") {
            depth++;
            best = Math.max(best, depth);
        } else if (ch === ")") {
            depth--;
        }
    }
    return best;
}
