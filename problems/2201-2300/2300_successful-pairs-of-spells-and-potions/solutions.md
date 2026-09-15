# Solutions — Successful Pairs of Spells and Potions

## Sort Potions + Per-Spell Binary Search

Fixing a spell of strength `s`, a potion of strength `p` is successful exactly when `s * p >= success`, i.e. when `p >= success / s`. Because the threshold only depends on the potion's strength, successful potions are exactly the strongest suffix of the potion multiset: if some potion works, every potion at least as strong also works. That monotonicity turns the per-spell count into a range count over a sorted array.

Sort `potions` once. For each spell, compute the minimum required potion strength as `need = ceil(success / s)`, done in integer arithmetic as `(success + s - 1) // s` to avoid floating-point error (values reach `10^10`, beyond exact float precision territory for safe comparison). Then `bisect_left(potions, need)` gives the count of potions strictly below the requirement, so `m - bisect_left(...)` is the number of successful pairs for that spell. Results are appended in the original spell order.

Edge cases fall out of the formula: a very strong spell can make `need <= 1`, in which case every potion counts; a weak spell can make `need` larger than the biggest potion, yielding zero. Since `success >= 1` and all strengths are positive, `need` is always at least 1 and the division never degenerates. Sorting dominates the work and is done a single time regardless of how many spells there are.

**Complexity:** `O((n + m) log m)` time, `O(m)` space (for the sorted copy of `potions`; excluding the output array).
