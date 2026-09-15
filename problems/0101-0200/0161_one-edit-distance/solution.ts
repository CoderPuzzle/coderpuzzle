function isOneEditDistance(s: string, t: string): boolean {
    // Swap so s is the shorter (or equal) string: a delete on one side
    // is an insert on the other, so one orientation covers both.
    if (s.length > t.length) {
        [s, t] = [t, s];
    }
    if (t.length - s.length > 1) {
        // No single edit changes the length by more than one.
        return false;
    }
    for (let i = 0; i < s.length; ++i) {
        if (s[i] !== t[i]) {
            if (s.length === t.length) {
                // Replace: both tails after the first divergence must agree.
                return s.slice(i + 1) === t.slice(i + 1);
            }
            // Insert t[i] into s: s from here must match t from the next slot.
            return s.slice(i) === t.slice(i + 1);
        }
    }
    // s is a prefix of t: identical strings are zero edits apart, so exactly
    // one edit remains only if t has one character more.
    return t.length - s.length === 1;
}
