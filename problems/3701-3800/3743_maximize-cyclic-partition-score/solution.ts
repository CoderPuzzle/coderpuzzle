function maximumScore(nums: number[], k: number): number {
    // Each subarray contributes a +max and a -min mark, so at most
    // min(k, n // 2) opposite pairs exist; a pair's credit is its plus
    // mark minus its minus mark -- exactly one subarray's range.
    // Scores stay below 2^53, so plain doubles are exact here.
    const size = Math.min(k, Math.floor(nums.length / 2)) + 1;
    const NEG = -Infinity;
    const fresh = (): number[] => new Array(size).fill(NEG);
    // Close a pair: the count grows by one.
    const shiftAdd = (states: number[], delta: number): number[] => {
        const out = fresh();
        for (let i = 1; i < size; ++i) if (states[i - 1] !== NEG) out[i] = states[i - 1] + delta;
        return out;
    };
    const bump = (states: number[], delta: number): number[] => states.map((v) => (v === NEG ? v : v + delta));
    const merge = (a: number[], b: number[]): number[] => a.map((v, i) => (v >= b[i] ? v : b[i]));

    // Phase 0: closed[j] = j pairs done; op/om = one open pair started with
    // a +/- still owing its opposite sign.
    let closed = fresh();
    closed[0] = 0;
    let op = fresh();
    let om = fresh();
    // Phase 1: wp/wm = the seam pair open, started +/-; wXY = seam X and an
    // open middle pair Y; fz = the seam pair has closed.
    let wp = fresh(),
        wm = fresh(),
        wpp = fresh(),
        wpm = fresh(),
        wmp = fresh(),
        wmm = fresh(),
        fz = fresh();

    for (const a of nums) {
        const pristine = closed[0];

        const nOp = merge(op, bump(closed, a));
        const nOm = merge(om, bump(closed, -a));
        const nClosed = merge(merge(closed, shiftAdd(op, -a)), shiftAdd(om, a));

        let nWp: number[] = [...wp];
        let nWm: number[] = [...wm];
        nWp[0] = Math.max(nWp[0], pristine + a); // seam opens at the first mark
        nWm[0] = Math.max(nWm[0], pristine - a);
        const nWpp = merge(wpp, bump(wp, a));
        const nWpm = merge(wpm, bump(wp, -a));
        const nWmp = merge(wmp, bump(wm, a));
        const nWmm = merge(wmm, bump(wm, -a));
        nWp = merge(nWp, merge(shiftAdd(wpp, -a), shiftAdd(wpm, a)));
        nWm = merge(nWm, merge(shiftAdd(wmp, -a), shiftAdd(wmm, a)));

        // The seam close reads the pre-step wp/wm, so it runs last.
        fz = merge(merge(fz, shiftAdd(wp, -a)), shiftAdd(wm, a));

        closed = nClosed;
        op = nOp;
        om = nOm;
        wp = nWp;
        wm = nWm;
        wpp = nWpp;
        wpm = nWpm;
        wmp = nWmp;
        wmm = nWmm;
    }

    let best = 0;
    for (let i = 0; i < size; ++i) best = Math.max(best, closed[i], fz[i]);
    return best;
}
