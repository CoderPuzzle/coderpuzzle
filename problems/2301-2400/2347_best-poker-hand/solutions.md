# Solutions — Best Poker Hand

## Count rank multiplicities and test suit uniformity

The hand types are ranked strictly from best to worst, so the answer is
decided by the first condition that holds. `"Flush"` holds exactly when all
five suits are equal. Otherwise the rank multiplicities alone decide:
`"Three of a Kind"` is any rank appearing three or more times, `"Pair"` is
any rank appearing exactly twice — two separate pairs still only make a
`"Pair"` — and when all five ranks are distinct the best available hand is a
`"High Card"`. A rank appearing four times contains three cards of the same
rank, so it still lands in `"Three of a Kind"`: the conditions are tested as
thresholds, not matched exactly.

Count how often each rank occurs and track whether any suit differs from the
first one. Return `"Flush"` on full suit uniformity; otherwise return
`"Three of a Kind"` when the largest rank count reaches 3, `"Pair"` when it
reaches 2, and `"High Card"` otherwise. Note a flush can never coincide with
a repeated rank here — the no-duplicate-card rule forbids two cards sharing
both rank and suit — but checking the suit condition first is what the hand
ranking demands regardless.

With the input fixed at five cards, every step touches constant-size data
over constant alphabets.

**Complexity:** `O(1)` time, `O(1)` space.
