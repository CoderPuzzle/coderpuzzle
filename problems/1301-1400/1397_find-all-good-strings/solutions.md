# Solutions — Find All Good Strings

## Digit DP with KMP automaton state

Counting strings in the range `[s1, s2]` that avoid `evil` is a digit DP over the alphabet `{a..z}`. Build the candidate character by character and track two flags: `lo` (the prefix so far equals `s1`'s prefix, so the next character is bounded below) and `hi` (the prefix equals `s2`'s, bounding above). When neither flag is set the next character is free from `a` to `z`; the bounds only bite while the prefix still hugs `s1` or `s2`, and a flag clears the first time a character diverges from the boundary string.

The "contains no `evil`" constraint needs to be checked incrementally without rescanning. Run KMP's failure-function preprocessing on `evil` once, and let the DP state `state` be the length of the longest suffix of the built prefix that is also a prefix of `evil` — the classic automaton state. On appending character `ch`, `advance(state, ch)` walks the failure links until `evil[state] == ch` or the state empties, then increments; reaching `state == m` means `evil` was just completed, so such a branch contributes zero and is pruned immediately.

The recursion `dfs(pos, state, lo, hi)` returns the count of completions from that state and is memoized: its value depends only on those four parameters, not on how they were reached, so each of the `n * m * 4` states is solved once. Within a state the alphabet contributes at most 26 transitions, each performing a failure-link walk of length at most `m` in the worst case. Checks at the top of the recursion (`state == m` returns 0 before `pos == n` returns 1) ensure a string that completes `evil` exactly at its last character is still rejected.

Edge cases: `evil` longer than `n` can never match — harmless, since `state` simply cannot reach `m`; tight ranges like `s1 == s2` reduce to checking a single string; and the modulo is applied at each level to keep counts bounded.

**Complexity:** `O(26 * n * m^2)` time, `O(n * m)` space, where `m = len(evil)`.
