function scoreBalance(s: string): boolean {
    // The total letter score lets every split compare a running prefix
    // against the remainder: the halves balance exactly when the running
    // score reaches half the total.
    let total = 0;
    for (const ch of s) {
        total += ch.charCodeAt(0) - 96;
    }
    let left = 0;
    // Sweep the split points, growing the left side one letter at a time;
    // stopping before the final character keeps both halves non-empty.
    for (let i = 0; i < s.length - 1; i++) {
        left += s.charCodeAt(i) - 96;
        if (2 * left === total) {
            return true;
        }
    }
    return false;
}
