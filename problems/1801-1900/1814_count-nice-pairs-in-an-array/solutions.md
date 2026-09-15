# Solutions — Count Nice Pairs in an Array

The pair condition mixes four values, but it is linear in each index, so it
can be pulled apart: moving the reversals across the equality leaves
`nums[i] - rev(nums[i])` on one side and the same expression in `j` on the
other.

## Group by value minus reversal

Define the key of an element as `x - rev(x)`, computed with the usual digit
loop that pops digits off the back of `x` and pushes them onto an
accumulator (trailing zeros vanish naturally, so `rev(120) = 21`). Two
indices form a nice pair exactly when their keys are equal, which turns the
quadratic pair scan into a grouping problem: every element pairs with every
earlier element of the same key.

One pass with a hash map does the counting. When element `x` arrives, the
map already holds how many earlier elements share its key — that is exactly
the number of new pairs `x` completes — and then `x`'s own key count is
incremented. Summing those hits over the whole array counts every pair
once, at its later endpoint. The total reaches `C(10⁵, 2) ≈ 5 × 10⁹`
when all elements share one key, which overflows 32 bits, so the
accumulator is 64-bit (exact below `2⁵³` in JavaScript as well) and is
reduced modulo `10⁹ + 7` once at the end.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the length of
`nums`.
