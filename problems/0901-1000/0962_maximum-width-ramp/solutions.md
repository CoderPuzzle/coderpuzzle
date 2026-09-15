# Solutions — Maximum Width Ramp

A ramp's width is pure index distance, so for any fixed right end the best
partner is the leftmost position whose value does not exceed it — and a
position is worth considering as a left end only when no earlier position
holds a smaller value, because that earlier position would widen every ramp
it could ever take part in. One decreasing stack collects those record lows in
a left-to-right pass; a right-to-left pass then cashes each one in against the
widest right end that still dominates it, and the widest qualifying gap falls
out.

## Monotonic stack of record lows

The first pass keeps an index `i` on the stack only when `nums[i]` undercuts
the value at the current top, so the stack's values strictly decrease from
bottom to top and every skipped index has an older, smaller-or-equal witness
below it. Skipping is exactly why the stack is safe: if `nums[i] >= nums[top]`
with `top < i`, then any `j` that accepts `i` also accepts `top`, at strictly
greater width — `i` can never be the left end of a widest ramp. Plateaus are
skipped for the same reason: the first copy of a value beats every later copy.

The second pass walks `j` from the right. Whenever the value on top of the
stack is `<= nums[j]`, that top is popped and `j - top` challenges the answer.
Popping at the _first_ dominating `j` is what makes the scan exhaustive: the
remaining candidates `j'` all lie further left, so any ramp this top could
still form is narrower than the one just recorded. In Example 1 the record
lows of `[6,0,8,2,1,5]` sit at indices 0 and 1; scanning back, `j = 5` (the 5) pops the 0 at index 1 for width 4, and the 6 at index 0 is only popped at
`j = 2` (width 2) — the answer is 4. A strictly decreasing array never pops
and answers 0; an all-equal array keeps only index 0 and pops it at the last
index for width `n - 1`.

**Complexity:** `O(n)` time, `O(n)` space.
