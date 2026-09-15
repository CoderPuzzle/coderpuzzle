# Solutions — Minimum Flips to Make Binary String Coherent

## Subsequence automaton DP

For each forbidden pattern, keep how many of its first characters have
already been matched as a subsequence by the string built so far. State
`(a, b)` tracks progress toward `"011"` and `"110"`; reaching length 3 means
the pattern occurred.

Process each original character by trying to write either `'0'` or `'1'`.
Writing a different character costs one flip. Keep the minimum cost for every
safe pair of automaton states. The answer is the cheapest state after the
whole string.

**Complexity:** `O(n)` time, `O(1)` space.
