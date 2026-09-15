# Solutions — Best Time to Buy and Sell Stock II

## One pass, collect every rise

With unlimited transactions, holding a share through a falling day is always a mistake: selling the day before the fall and buying back at the bottom still collects every later rise, and costs nothing extra. So some optimal plan holds exactly on the rising runs — buy at each valley, sell at each peak — and its profit is the sum of those rises. Capturing every rise is therefore maximal, and consecutive rises merge into one longer hold, which is why "as many transactions as you like" never forces a worse schedule.

The code walks `prices` once, comparing each day with the one before it and adding the difference whenever it is positive. A falling or flat day contributes nothing; a rising day's gain is pocketed. For `prices = [7,1,5,3,6,4]` that banks `(5-1) + (6-3) = 7`, the two transactions from the first example, and for prices that only fall nothing is ever added, so the answer is the no-profit `0`.

A single price never enters the loop and correctly yields `0`. With at most `3 * 10⁴` days of prices up to `10⁴`, the total stays below `1.5 * 10⁸`, far inside the 32-bit integer range.

**Complexity:** `O(n)` time, `O(1)` space.
