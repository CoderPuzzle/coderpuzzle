/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
var minHeightShelves = function (books, shelfWidth) {
    // Order is fixed and each shelf holds a contiguous run, so the only
    // freedom is where boundaries fall: dp[i] = best height for the first
    // i books, with dp[0] = 0 as the empty base.
    const count = books.length;
    const dp = new Array(count + 1).fill(0);
    for (let i = 1; i <= count; i++) {
        // Grow the last shelf of the prefix backwards from book i-1,
        // accumulating width and the run's max height.
        let width = 0;
        let height = 0;
        dp[i] = Infinity;
        for (let j = i - 1; j >= 0; j--) {
            const [thickness, bookHeight] = books[j];
            width += thickness;
            // Earlier books only widen the run further: stop here.
            if (width > shelfWidth) {
                break;
            }
            height = Math.max(height, bookHeight);
            // Books j..i-1 form the last shelf at cost dp[j] + height.
            dp[i] = Math.min(dp[i], dp[j] + height);
        }
    }
    return dp[count];
};
