# Solutions — Substring With Largest Variance

## Kadane over character pairs

The variance of a substring is the maximum over ordered character pairs `(high, low)` of `count(high) - count(low)`, so it suffices to solve a two-character subproblem for every ordered pair of letters actually present and take the overall maximum. For a fixed pair, map `high` to `+1`, `low` to `-1`, and every other character to `0`; the best substring sum of this mapped array, restricted to substrings containing at least one `low`, is exactly the best variance achievable by that pair — the "at least one `low`" clause matters because variance is defined over characters _present_ in the substring, and a substring of all `high`s has variance 0, not its length.

This is Kadane's algorithm with a companion value: `diff` is the best subarray sum ending at the current position (allowed to lack a `low`, reset to 0 whenever it would go negative), while `diff_with_low` is the best sum ending here that is guaranteed to contain at least one `low`. On a `high` both values increment. On a `low`, if the companion is already live it becomes `max(diff_with_low - 1, diff)` — either extend the previous best-with-low through this `-1`, or graft the entire no-`low` prefix ending here onto it, which is always at least as good as restarting from scratch; if it is not yet live, this `low` initializes it with the current `diff` (now including the `-1`) and raises the `has_low` flag. Afterwards `diff` is clamped at 0 for the next restart. All other characters are simply skipped, contributing 0 to both. Only `diff_with_low` is ever compared against the answer.

Each pair costs one linear scan, and the pairs are restricted to letters occurring in `s`, so at most `26 × 25` ordered pairs are tried — the double loop skips `high == low`. The answer is initialized to 0, which every single-character substring attains. The scan carries a constant number of scalars.

**Complexity:** `O(26² · n)` time, `O(1)` space.
