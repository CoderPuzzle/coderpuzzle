# Solutions — Encode String with Shortest Length

## Interval Dynamic Programming

The solution fills a table `dp[i][j]` with the shortest valid encoding of the substring `s[i..j]`, working over intervals from the shortest to the longest so that whenever a larger interval is solved, every subinterval it needs is already computed. For each interval there are three candidate answers: keep the substring verbatim, cut it into two pieces at some split point and concatenate their already-optimal encodings `dp[i][k] + dp[k+1][j]`, or recognize the whole interval as `k` repetitions of a shorter block and write it as `k[pattern]`.

The compression step tries every period `p` that divides the interval length and checks whether the prefix `s[i..i+p-1]` repeated `length/p` times rebuilds the interval. If it does, the encoded form is `str(length/p) + "[" + dp[i][i+p-1] + "]"` — note it embeds the _encoded_ pattern, not the raw one, so nested encodings such as `4[2[a]]` arise naturally when the repeating unit itself compresses. Among all working periods the shortest encoded string is kept.

The tie-breaking rule encodes the problem statement's "if it does not make the string shorter, do not encode it": a compression replaces the current best only if strictly shorter, or if it ties in length while the best is no longer the raw substring (a tie against the raw text keeps the text). So `"aaa"` stays `"aaa"` while `"aaaaa"` becomes `"5[a]"`, and multi-digit counts such as `10[a]` are handled for free by `str()`. The final answer is `dp[0][n-1]`, which covers the whole string. With `n <= 150` the quartic work is small in practice, since most intervals split trivially or have no repeating period.

**Complexity:** `O(n^4)` time, `O(n^3)` space.
