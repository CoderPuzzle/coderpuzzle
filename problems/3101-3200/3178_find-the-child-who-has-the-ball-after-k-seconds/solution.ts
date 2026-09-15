function numberOfChild(n: number, k: number): number {
    // The holder walks 0 -> n-1 -> 0 in exactly 2 * (n - 1) seconds and
    // is back at child 0 facing right, so positions are periodic with
    // that cycle. Reduce k modulo the cycle: the first n - 1 steps walk
    // forward, the rest retrace backward at mirrored offsets.
    const r = k % (2 * (n - 1));
    return r < n ? r : 2 * (n - 1) - r;
}
