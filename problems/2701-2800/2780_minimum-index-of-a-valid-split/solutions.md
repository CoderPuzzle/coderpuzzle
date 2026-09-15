# Solutions — Minimum Index of a Valid Split

## Prefix sweep of the dominant

A hash map tallies every value in one pass, and the guaranteed sole dominant `x` — call its frequency `f` — is simply the tally that ends largest. Restricting attention to `x` is not an assumption but arithmetic: a value dominating both halves holds more than half of the prefix and more than half of the suffix, and doubling and adding those two inequalities yields more than half of the whole array. Exactly one dominant is promised, so any value capable of anchoring a valid split on either side must be `x` itself, and no other value ever needs testing.

A second sweep walks the split points left to right carrying `f1`, the number of copies of `x` met so far. Splitting after index `i`, the prefix holds `i + 1` elements, so `x` dominates it exactly when `f1 * 2 > i + 1`; the suffix holds `f - f1` copies of `x` among its `n - i - 1` elements and is dominated exactly when `(f - f1) * 2 > n - i - 1`. Both comparisons are strict — a tally that merely ties its half's length (`count * 2 == length`) does not dominate. The first index passing both tests is returned; if the sweep finishes without one, no valid split exists and the method returns `-1`.

Minimality costs nothing because the sweep returns at the first success. The small shapes follow from the same inequalities: with `n = 1` no index satisfies `i < n - 1`, so the loop body never runs and the answer is `-1`; `[x, x]` succeeds immediately at `i = 0`, one copy dominating each single-element half.

**Complexity:** `O(n)` time, `O(n)` space.
