/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    // Every ugly number past 1 is a smaller ugly times 2, 3, or 5, so the
    // sequence is generated in order as the merge of three virtual lists
    // 2·U, 3·U, 5·U — no testing of arbitrary integers for ugliness.
    const ugly = new Array(n + 1);
    ugly[0] = 1;
    // One cursor per list, sitting on the source of its smallest
    // not-yet-emitted element.
    let i2 = 0,
        i3 = 0,
        i5 = 0;
    for (let i = 1; i <= n; i++) {
        const m2 = ugly[i2] * 2,
            m3 = ugly[i3] * 3,
            m5 = ugly[i5] * 5;
        // The next ugly number is the smallest head of the three lists.
        const nxt = Math.min(m2, m3, m5);
        ugly[i] = nxt;
        // Advance EVERY cursor whose candidate matched: 6 arises as both
        // 2·3 and 3·2, and the dual advance suppresses such duplicates.
        if (nxt === m2) i2++;
        if (nxt === m3) i3++;
        if (nxt === m5) i5++;
    }
    // The array carries a leading 1, so the n-th ugly number is at n - 1.
    return ugly[n - 1];
};
