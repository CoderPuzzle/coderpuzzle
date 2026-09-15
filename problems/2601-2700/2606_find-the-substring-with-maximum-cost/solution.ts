function maximumCostSubstring(s: string, chars: string, vals: number[]): number {
    // Resolve each letter's value once (defaults from the alphabet,
    // overrides from chars), then Kadane's algorithm; snapping the running
    // sum back to 0 whenever it dips negative keeps the empty substring's
    // cost of 0 as the floor for the answer. Costs are bounded by 1e5 *
    // 1000 = 1e8, far inside Number's exact-integer range.
    const value = new Int32Array(26);
    for (let i = 0; i < 26; ++i) value[i] = i + 1;
    for (let i = 0; i < chars.length; ++i) {
        value[chars.charCodeAt(i) - 97] = vals[i];
    }
    let best = 0;
    let run = 0;
    for (let i = 0; i < s.length; ++i) {
        run = Math.max(run + value[s.charCodeAt(i) - 97], 0);
        if (run > best) best = run;
    }
    return best;
}
