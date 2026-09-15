# Solutions — Reducing Dishes

## Greedy on the ascending-sorted satisfaction values

Sort the satisfaction levels ascending. In any chosen set, the largest
satisfaction should be cooked last, where the time multiplier is biggest,
so a chosen set is always prepared in ascending order and its coefficient
is the sum of `time * satisfaction` over that sorted order. The key
observation is that the chosen set is a suffix of the sorted array: if a
dish is worth cooking at all, every dish with a larger satisfaction is
also worth cooking, because moving it into the plan can only push the
tastier dishes to even better time multipliers.

Walk the sorted array from the largest value down, maintaining two
running quantities. `running_sum` is the sum of the satisfaction values
already chosen (the suffix built so far), and `total` is the best
coefficient for that suffix. When considering a new value `v`, adding it
at the front of the suffix shifts every already-chosen dish one time slot
later — increasing the coefficient by `running_sum` — and contributes
`v * 1` for its own new slot, so the net change is `v + running_sum`.
Whenever that net change is positive, the dish improves the answer, so it
is added: `running_sum` grows by `v` and `total` grows by the new
`running_sum`. A non-positive net change means the dish (and, by the
suffix argument, everything smaller) can never help, so the scan stops
returning `total` — which is `0` when no dish is worth cooking.

**Complexity:** `O(n log n)` time from the sort, `O(1)` extra space,
where `n` is the number of dishes.
