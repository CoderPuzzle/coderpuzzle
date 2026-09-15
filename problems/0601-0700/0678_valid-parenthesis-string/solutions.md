# Solutions — Valid Parenthesis String

## One sweep with an open-count range

A string with no `'*'` is decided by one counter: rise on `'('`, fall on `')'`, never below zero, end at zero. The `'*'` breaks that single counter, because at any point the true number of open parentheses is not one value but a set of possibilities — each star already seen could have been read as `'('`, `')'`, or nothing. The key observation is that this set is always a contiguous range of integers, so two numbers carry all of it: `lo`, the fewest opens any reading of the stars leaves open, and `hi`, the most. A `'('` raises both ends, a `')'` lowers both, and a `'*'` trades one for the other — `lo - 1`, `hi + 1` — since reading it as `')'` spends an open, as `'('` lends one, and as empty moves nothing.

Two boundary facts turn the range into a decision procedure. If `hi` drops below zero, even the greediest reading — every star so far as `'('` — cannot absorb the `')'` just seen, and no later character can repay a debt that already exists, so the answer is false on the spot. `lo` is clamped at zero for the mirror reason: readings that had already closed more than they opened are dead, and clamping simply drops them from the range while the surviving readings stay contiguous. `"(*))"` runs `(1,1) → (0,2) → (-1,1)→(0,1) → (0,0)`, ending with a range that still contains zero, while `")*("` dies at its first character.

The string is valid exactly when the final range contains zero, and since `lo` is the range's bottom the test is `lo == 0`: some surviving reading closed everything it opened. Nothing is stored per star — the range is the entire state — so the sweep is one pass with two integer counters regardless of how the stars are sprinkled, and the `'('`-before-`')'` ordering rule is enforced structurally, by the counters themselves, rather than checked afterward.

**Complexity:** `O(n)` time, `O(1)` space.
