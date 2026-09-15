function secondHighest(s: string): number {
    // One pass tracking the two largest distinct digits seen: first is
    // the maximum, second the runner-up. A digit equal to an
    // already-tracked value changes nothing, which is the distinctness
    // rule; -1 survives when fewer than two distinct digits appear.
    let first = -1;
    let second = -1;
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        if (c >= 48 && c <= 57) {
            const v = c - 48;
            if (v > first) {
                second = first;
                first = v;
            } else if (second < v && v < first) {
                second = v;
            }
        }
    }
    return second;
}
