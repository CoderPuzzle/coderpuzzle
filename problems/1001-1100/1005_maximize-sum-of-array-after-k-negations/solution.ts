function largestSumAfterKNegations(nums: number[], k: number): number {
    // Sort so the most negative values lead, then spend operations on them
    // first — flipping the most negative value always raises the sum by
    // the most. Stop as soon as either k runs out or the walk reaches a
    // nonnegative value.
    const sorted = [...nums].sort((a, b) => a - b);
    const n = sorted.length;
    let i = 0;
    while (i < n && sorted[i] < 0 && k > 0) {
        sorted[i] = -sorted[i];
        k--;
        i++;
    }
    let total = 0;
    let minAbs = Infinity;
    for (const value of sorted) {
        total += value;
        minAbs = Math.min(minAbs, Math.abs(value));
    }
    // Any leftover operations only matter by parity: flipping the same
    // value twice restores it. An odd leftover must land somewhere, and the
    // cheapest place is the smallest absolute value in the array —
    // scanning the whole array (not just the untouched suffix) also covers
    // a zero sitting among the values, which absorbs the flip for free no
    // matter how many operations remain.
    if (k % 2 === 1) {
        total -= 2 * minAbs;
    }
    return total;
}
