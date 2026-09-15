# Solutions — Longest Palindromic Subsequence After at Most K Operations

## Interval DP over a Cost Budget

This is the classic longest-palindromic-subsequence interval DP with a third dimension for the operation budget: `dp[i][j][c]` is the longest palindromic subsequence of `s[i..j]` achievable with at most `c` character changes. The recurrence takes the best of three options — drop the left end (`dp[i+1][j][c]`), drop the right end (`dp[i][j-1][c]`), or match the two ends as the outermost pair. Matching costs the cyclic distance between the letters, `d = min(|a - b|, 26 - |a - b|)`, since letters wrap around (`'z'` to `'a'` is one step); it is available only when `d <= c` and yields `dp[i+1][j-1][c-d] + 2`.

The order of evaluation is by increasing interval length, so both shorter subintervals are already computed for every budget. Base cases are single characters (`dp[i][i][c] = 1` for every `c` — a lone character is a palindrome and needs no edit); empty ranges never appear because length starts at 2 and drops both indices together. Note the budget dimension is "at most `c`": each state keeps the best over spends within `c`, and looking down to `c - d` when matching is what makes exact costs composable.

An important subtlety is that the greedy "make ends equal as cheaply as possible" choice is encoded directly in `d`: for two letters there is no benefit to any larger transformation, because only equality of the pair matters, and the minimum cyclic distance is the cheapest way to reach equality in either direction. Since the DP explores drop-left/drop-right/match simultaneously with all budgets, it covers every assignment of edits to positions.

Edge cases: strings of length 1 (answer 1 immediately), `k` large enough to make the whole string a palindrome (answer `n`, as in example 2), and pairs already equal (`d = 0`) matched for free at every budget level.

**Complexity:** `O(n^2 * k)` time, `O(n^2 * k)` space.
