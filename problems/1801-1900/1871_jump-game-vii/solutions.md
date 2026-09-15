# Solutions — Jump Game VII

Treating this as a plain reachability problem and searching from each
position over its whole jump interval is quadratic in the worst case: a
string of all zeros with a wide window makes every position open the
same large range. The fix is to notice that every reachable index `i`
contributes one contiguous interval `[i + minJump, i + maxJump]` of
potentially reachable positions, so "is some source in a window" is a
range query that prefix sums answer in constant time.

## Prefix-sum reachability sweep

Keep `reach[i]`, whether index `i` is reachable, and a running prefix
sum of how many reachable indices appear before each position. Index `i`
(with `s[i] == '0'`) is reachable exactly when the window of sources
`[i - maxJump, i - minJump]` contains at least one reachable index,
which is `pre[i - minJump + 1] - pre[i - maxJump] > 0`. Sweep left to
right, folding each newly reached index into the prefix sums as you go;
the answer is `reach[n - 1]`.

The sweep is correct because jumps always move strictly right: by the
time index `i` is tested, every possible source below it has already
been folded into the prefix sums. Positions holding `'1'` are simply
never marked, and the window test naturally handles both boundary
clamps since out-of-range windows are empty.

**Complexity:** `O(n)` time, `O(n)` space.
