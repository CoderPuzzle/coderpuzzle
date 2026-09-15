function diStringMatch(s: string): number[] {
    // Two counters bracket the value range: `lo` is the smallest value
    // not yet placed, `hi` the largest. An 'I' is safest satisfied with
    // lo (everything still unused is larger), a 'D' with hi — the pinned
    // canonical construction.
    const n = s.length;
    let lo = 0;
    let hi = n;
    const perm: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (s[i] === "I") {
            perm.push(lo++);
        } else {
            perm.push(hi--);
        }
    }
    // lo and hi have met; the single leftover value fills the last slot.
    perm.push(lo);
    return perm;
}
