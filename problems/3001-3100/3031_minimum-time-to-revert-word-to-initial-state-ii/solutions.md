# Solutions — Minimum Time to Revert Word to Initial State II

## Prefix function, border lengths as cut points

After `t` seconds exactly the first `t * k` characters of the original word have been removed, and every character added along the way is ours to choose, so reversion at step `t` is possible in exactly two ways. Either `t * k >= n`, where nothing original survives and we simply append a copy of the word's tail, or the surviving suffix must already look like the prefix it needs to become: `word[:n - t*k] == word[t*k:]`. That equality says `t * k` is a period of the word, i.e. `n - t*k` is a border length (a proper prefix that is also a suffix).

The KMP prefix function yields all border lengths at once: starting from `fail[n-1]` and repeatedly following `fail` visits every length that is both a prefix and a suffix, which we mark in a boolean table. Scanning `t = 1, 2, ...` then answers at the first `t` whose cut passes either test — an O(1) check per candidate — and the scan cannot run past `ceil(n / k)`, where the whole word has rotated out regardless.

**Complexity:** `O(n)` time and `O(n)` space.
