# Solutions — Maximum Total Reward Using Operations I

## Sorted take/skip reachability over achievable totals

Two observations collapse the process into a subset-sum shape. First, the
picks of any legal play happen in strictly increasing value order: a value
is only usable while it exceeds the total, which already includes every
earlier pick, so equal or smaller later values are locked out and duplicate
copies can never both be used. Second, only reachable totals matter, not
which indices produced them — exactly the state after the first i rewards
from the statement's hints. Sorting rewardValues ascending, then keeping a
boolean row `reachable[t]` = "some play ends at total t", lets each value v
extend precisely from totals t < v; scanning that range descending gives
each copy a single use per sweep, in classic knapsack style.

The totals themselves never leave 32-bit range for an honest reason: the
last collected value exceeds everything collected before it, so any final
total is below 2 × max(rewardValues) ≤ 4000 — hence rows of ~4000 bits and
an answer comfortably inside `int`. The answer is simply the highest set
bit once every value has been processed.

**Complexity:** `O(n log n + nS)` time, `O(S)` space, where S < 2 × max
reward value.
