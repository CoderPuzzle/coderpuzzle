# Solutions — Palindrome Removal

## Interval Dynamic Programming

The key insight is that removals concatenate the remaining left and right parts, so the cost of clearing a subarray depends only on that subarray's contents: `dp[i][j]` is the minimum number of moves to erase `arr[i..j]`. Base cases are length 1 (one move) and length 2 (one move if the two elements are equal, else two).

For longer intervals, three kinds of transition are combined. Any interval can shed its first element in some move of an optimal schedule, giving the upper bound `1 + dp[i+1][j]`. Any split point `k` gives `dp[i][k] + dp[k+1][j]`, since the two halves can be cleared independently — removals never mix elements across a boundary that both sides respect. The subtle transition applies when `arr[i] == arr[j]`: it is always safe to assume the two equal ends are removed in the same move, deferred to the very last turn. Clearing the interior first costs `dp[i+1][j-1]`; the two equal ends then sit adjacent (a two-element palindrome) or around an already-palindromic residue, and one final move removes them together.

Why deferring the matched ends to the last move loses nothing: in any optimal schedule for the interval, the move that consumes `arr[i]` can be rearranged so it also consumes `arr[j]` — palindromes remain palindromes when a matching pair is peeled from both sides of a schedule, so an equal-end pairing never costs extra. Filling the table by increasing interval length ensures every referenced subinterval (`dp[i+1][j]`, the splits, `dp[i+1][j-1]`) is already final. For an array of `n` elements, the answer is `dp[0][n-1]`, with the empty array returning 0.

**Complexity:** `O(n³)` time, `O(n²)` space.
