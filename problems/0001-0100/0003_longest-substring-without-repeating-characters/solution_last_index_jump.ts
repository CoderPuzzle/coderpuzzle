function lengthOfLongestSubstring(s: string): number {
    // last maps each character to its most recent index; the window
    // s[start..i] is kept duplicate-free throughout the sweep.
    const last = new Map<string, number>();
    let start = 0,
        best = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        // The >= start guard ignores occurrences left of the window;
        // without it start could be dragged backwards.
        if (last.has(c) && last.get(c)! >= start) {
            // The window can no longer include that older occurrence, so
            // start leaps over the conflict instead of shrinking by one.
            start = last.get(c)! + 1;
        }
        last.set(c, i);
        // Window is duplicate-free again: record its length.
        if (i - start + 1 > best) best = i - start + 1;
    }
    return best;
}
