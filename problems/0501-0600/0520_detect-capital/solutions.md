# Solutions — Detect Capital

## Count capitals in one sweep

The three legal usages ask two questions of the word and nothing more: how
many capitals does it hold, and is the leading character one of them. A
single left-to-right sweep answers the first by counting characters in the
ASCII upper range — no prefix ever needs revisiting, because the verdict
depends only on the final totals.

With `capitals` in hand the verdict is three comparisons. `capitals == 0`
accepts the all-lowercase word, `capitals == len(word)` the all-caps one,
and the `"Google"` shape is `capitals == 1` with that lone capital sitting
at index 0. Every other distribution — a capital buried in lowercases, a
lowercase trailing capitals, two capitals heading a lowercase body — fails
all three, which is exactly why `"FlaG"` and `"mL"` are rejected.

**Complexity:** `O(n)` time, `O(1)` space.
