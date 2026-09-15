# Solutions — Minimum Cost to Separate Sentence Into Rows

## Dynamic programming over word suffixes

Split the sentence into words and let `dp[i]` be the minimum cost of laying out the suffix beginning at word `i`. Starting from each `i`, extend the current row one word at a time, including the separating spaces, and stop as soon as its length exceeds `k`.

For a row ending at word `j`, add `(k - length)² + dp[j + 1]`; if `j` is the final word, use zero instead because the last row is uncharged. Computing suffixes from right to left makes every required future state available, and taking the minimum over all feasible row endings considers every valid first break.

**Complexity:** `O(w²)` time and `O(w)` space, where `w` is the number of words.
