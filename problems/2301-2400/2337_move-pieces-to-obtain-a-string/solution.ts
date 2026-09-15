function canChange(start: string, target: string): boolean {
    const s: [number, string][] = [];
    const t: [number, string][] = [];
    // pieces cannot pass through each other, so their relative order is
    // invariant: the k-th non-blank of start must match the k-th of target
    for (let i = 0; i < start.length; i++) {
        if (start[i] !== "_") s.push([i, start[i]]);
    }
    for (let i = 0; i < target.length; i++) {
        if (target[i] !== "_") t.push([i, target[i]]);
    }
    // unequal piece counts can never be matched one-to-one
    if (s.length !== t.length) return false;
    for (let p = 0; p < s.length; p++) {
        const i = s[p][0],
            ci = s[p][1];
        const j = t[p][0],
            cj = t[p][1];
        // equal counts but a different L/R sequence cannot align
        if (ci !== cj) return false;
        // L slides only left: it must not need to move right (i >= j);
        // R slides only right: i <= j — and these checks are also
        // sufficient, so no moves ever need simulating
        if (ci === "L" && i < j) return false;
        if (ci === "R" && i > j) return false;
    }
    return true;
}
