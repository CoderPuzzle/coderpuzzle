// A size-k group anchored at start s spans the circle's tiles s .. s + k - 1
// and alternates exactly when its k - 1 neighbor pairs all differ. Sweep
// virtual positions 0 .. n + k - 2 (virtual index p reads tile p % n, so
// pairs continue seamlessly across the seam), tracking the alternating run
// ending there; each position credits anchor p - (k - 1) when it is a real
// start (0..n-1) and the run has reached k. Anchors are bounded to one lap,
// so nothing double counts.
function numberOfAlternatingGroups(colors: number[], k: number): number {
    const n = colors.length;
    let count = 0;
    let run = 0;
    for (let p = 0; p <= n + k - 2; p++) {
        run = p > 0 && colors[p % n] !== colors[(p - 1) % n] ? run + 1 : 1;
        const anchor = p - (k - 1);
        if (anchor >= 0 && anchor < n && run >= k) {
            count++;
        }
    }
    return count;
}
