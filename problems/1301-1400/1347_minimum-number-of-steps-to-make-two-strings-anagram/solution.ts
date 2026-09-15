function minSteps(s: string, t: string): number {
    // The answer is the per-letter deficit of t relative to s; each
    // replacement clears one unit, and deficits equal surpluses.
    const counts = new Array<number>(26).fill(0);
    for (const ch of s) ++counts[ch.charCodeAt(0) - 97];
    for (const ch of t) --counts[ch.charCodeAt(0) - 97];
    let steps = 0;
    for (const delta of counts) {
        if (delta < 0) steps -= delta;
    }
    return steps;
}
