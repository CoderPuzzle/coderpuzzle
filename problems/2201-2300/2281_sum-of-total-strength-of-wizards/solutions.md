# Solutions — Sum of Total Strength of Wizards

## Monotonic stacks and prefix sums of prefix sums

Summing `min × sum` over all `O(n²)` subarrays is hopeless at `n = 10^5`, so account by minimum instead: for each wizard `i`, find the subarrays in which `i` is the unique minimum, and add `strength[i]` times their combined element sums. Two monotonic stacks carve out the range — `prev[i]` is the nearest strictly smaller element on the left (popping while `>=`), and `nxt[i]` the nearest smaller-or-equal on the right (popping while `>`). The deliberate asymmetry between strict and non-strict comparisons breaks ties among equal strengths so that a subarray with several equal minima is claimed by exactly one of them: the range for `i` spans starts in `(prev[i], i]` and ends in `[i, nxt[i])`, and no subarray is counted twice or missed.

Within that range the contribution is `strength[i] × Σ over (l, r) of sum(l..r)`, and expanding each `sum` as `prefix[r+1] - prefix[l]` separates the double sum into a closed form: with `left = i - prev[i]` start choices and `right = nxt[i] - i` end choices, the total equals `left × (Σ prefix over end side) - right × (Σ prefix over start side)`. Those prefix-sum ranges need their own prefix sums, so the code precomputes `pre_prefix` — the running sum of `prefix` — making each side a single subtraction. The contribution `strength[i] × (left × sum_right - right × sum_left)` is folded into the answer modulo `10^9 + 7` at every step.

Both stacks are linear (every index is pushed and popped at most once), and the three prefix tables plus final sweep are single passes, so the whole computation is dominated by a handful of length-`n` arrays. Python's big integers keep the intermediate products of `10^9`-scale strengths exact before the mod.

**Complexity:** `O(n)` time, `O(n)` space.
