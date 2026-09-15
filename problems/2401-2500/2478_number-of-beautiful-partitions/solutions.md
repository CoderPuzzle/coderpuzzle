# Solutions — Number of Beautiful Partitions

## Partition DP with Prefix Sums over Prime Starts

Only cut positions matter, not substring contents: a part beginning at index `x` is legal only if `s[x]` is a prime digit, and one ending at index `i - 1` is legal only if `s[i - 1]` is a non-prime digit. So let `dp[i][j]` count the ways to partition the first `i` characters into `j` beautiful parts. The last part is some `s[x:i]`; it is legal when `x <= i - minLength`, `s[x]` is prime, and `s[i-1]` is non-prime, giving the transition `dp[i][j] = sum of dp[x][j-1]` over eligible `x` — which is why `dp[i][j]` is simply skipped whenever `s[i-1]` is prime.

That inner sum is an interval sum over positions `x in [0, i - minLength]` restricted to prime-starting indices, and it is recomputed for every `i`. A per-layer prefix array removes the redundancy: while filling layer `j`, build `prefix[l] = dp[0][j-1] + ... + dp[l-1][j-1]` accumulating only positions where `s[x]` is prime. Then `dp[i][j]` is a single lookup, `prefix[i - minLength + 1]`, reduced modulo `10^9 + 7`.

Layer `j = 0` seeds `dp[0][0] = 1` (the empty prefix) and nothing else, so parts accumulate one at a time and each layer's prime-start filter implicitly enforces that the very first part starts on a prime digit — `x = 0` contributes only when `s[0]` is prime. After `k` layers, `dp[n][k]` is the answer; if the string cannot be split (bad ends, length starvation with `minLength`), the cell stays 0 naturally, with no special-casing.

The two nested loops over `k` layers and `n` end positions, plus linear prefix construction per layer, give `O(n·k)` time on `n <= 1000`; the full `dp` table is `O(n·k)` space.

**Complexity:** `O(n·k)` time, `O(n·k)` space.
