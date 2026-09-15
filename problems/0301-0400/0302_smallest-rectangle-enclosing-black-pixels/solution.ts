function minArea(image: string[][], x: number, y: number): number {
    // The region is connected, so its projection on each axis is one
    // contiguous range: every row between the topmost and bottommost
    // black row holds a black pixel, and likewise for columns. Each
    // "does this line hold a black pixel" predicate therefore flips
    // exactly once around the known black pixel (x, y).
    const hasBlackRow = (r: number): boolean => image[r].includes("1");
    const hasBlackCol = (c: number): boolean => image.some((row) => row[c] === "1");
    // First line in [lo, hi] that is black; has(hi) always holds because the
    // range brackets the line through (x, y) itself.
    const firstBlack = function (lo: number, hi: number, has: (index: number) => boolean): number {
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (has(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    };
    // Last line in [lo, hi] that is black; the +1 in the midpoint keeps the
    // window shrinking when only two lines remain.
    const lastBlack = function (lo: number, hi: number, has: (index: number) => boolean): number {
        while (lo < hi) {
            const mid = Math.floor((lo + hi + 1) / 2);
            if (has(mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    };
    // Each bound is a binary search outward from (x, y): the line through
    // (x, y) itself is black, so every window probed still brackets it.
    const top = firstBlack(0, x, hasBlackRow);
    const bottom = lastBlack(x, image.length - 1, hasBlackRow);
    const left = firstBlack(0, y, hasBlackCol);
    const right = lastBlack(y, image[0].length - 1, hasBlackCol);
    // The smallest enclosing rectangle is the cross of the two spans.
    return (bottom - top + 1) * (right - left + 1);
}
