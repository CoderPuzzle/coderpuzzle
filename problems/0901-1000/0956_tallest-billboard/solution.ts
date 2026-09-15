// DP over the support-height difference. best[d] is the tallest left support
// reachable with left - right == d; unreachable differences hold -1. Each rod
// is welded left, welded right, or discarded.
function tallestBillboard(rods: number[]): number {
    const total = rods.reduce((acc, rod) => acc + rod, 0);
    const span = 2 * total + 1;
    let best = new Array<number>(span).fill(-1);
    // index d + total keeps every difference non-negative
    best[total] = 0;
    for (const rod of rods) {
        const nxt = new Array<number>(span).fill(-1);
        for (let idx = 0; idx < span; idx += 1) {
            const left = best[idx];
            if (left < 0) {
                continue;
            }
            if (left > nxt[idx]) {
                nxt[idx] = left; // discard the rod
            }
            if (left + rod > nxt[idx + rod]) {
                nxt[idx + rod] = left + rod; // weld onto the left support
            }
            if (left > nxt[idx - rod]) {
                nxt[idx - rod] = left; // weld onto the right support
            }
        }
        best = nxt;
    }
    // difference 0 means equal supports; its left height is the answer.
    return best[total];
}
