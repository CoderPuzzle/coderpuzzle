// dp[i] = cheapest way to acquire everything from fruit i onward when
// fruit i itself is purchased. Buying fruit i makes fruits i+1..2i+1
// free, so if that reaches the end dp[i] = prices[i]; otherwise the next
// purchase lands on some j in [i+1, 2i+2] and dp[i] = prices[i] +
// min(dp[j]). Sweeping i right to left, that window's edges only move
// left, so a monotonic window supplies the minimum in O(1): win holds
// candidate indices, oldest first, with dp values non-decreasing toward
// the newest. All costs are exact doubles (sums <= 10^8).
function minimumCoins(prices: number[]): number {
    const n = prices.length;
    const dp: number[] = new Array(n).fill(0);
    const win: number[] = [];
    let head = 0;
    for (let i = n - 1; i >= 0; --i) {
        const j = i + 1;
        if (j < n) {
            while (win.length > head && dp[win[win.length - 1]] > dp[j]) {
                win.pop();
            }
            win.push(j);
        }
        while (head < win.length && win[head] > 2 * i + 2) ++head;
        if (2 * i + 1 >= n - 1) {
            dp[i] = prices[i];
        } else {
            dp[i] = prices[i] + dp[win[head]];
        }
    }
    return dp[0];
}
