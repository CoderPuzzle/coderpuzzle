# Solutions — Neither Minimum nor Maximum

## Median of the first three elements

A valid answer only has to be some element that is neither the global
minimum nor the global maximum. Any three distinct elements contribute
such a value for free: order the trio as [min, mid, max] and the middle
one beats one of its companions while losing to the other. A global
extreme can never land there — if an extreme happens to be inside the
trio it occupies an end slot by definition, and otherwise all three
values simply differ from it. So the mid of any three distinct elements
of `nums` is always a legal return value.

Fewer than three elements means every element is simultaneously the
minimum and the maximum, which is exactly when -1 is due. Otherwise take
the first three elements `a`, `b`, `c` and emit their sum minus their
minimum minus their maximum — the middle of the trio without sorting.
The values are bounded (`nums[i] <= 100`), so the intermediate sum stays
well under 300 and fits every language's native integer type with room
to spare.

**Complexity:** `O(1)` time, `O(1)` space.
