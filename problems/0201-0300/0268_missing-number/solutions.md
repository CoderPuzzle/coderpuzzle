# Solutions — Missing Number

Two `O(n)` time / `O(1)` space answers to the follow-up; one reasons about
sums, the other lets XOR pair values off against indices.

## Sum

The array holds `n` distinct values drawn from the `n + 1` integers `0..n`, so exactly one value of that range is absent. The sum of the complete range is fixed by the arithmetic series formula `n(n+1)/2`, which means the missing number is simply that total minus the sum of what is actually present — the one gap absorbs the entire difference.

The implementation is one expression: with `n = len(nums)`, return `n * (n + 1) // 2 - sum(nums)`. The integer division is exact because `n` and `n + 1` are consecutive integers, so their product is always even. Distinctness of the input guarantees the difference identifies a single missing value, never an ambiguity of several.

`sum` makes one pass over the array and the formula is O(1), meeting the follow-up's `O(n)` time / `O(1)` extra space requirement; in Python the arithmetic cannot overflow, and the fixed-width ports accumulate in a 64-bit integer so it cannot overflow there either.

**Complexity:** `O(n)` time, `O(1)` space.

## XOR

Same pairing idea as Single Number, but the partners are supplied by the indices: the full range `0..n` is exactly the set of array positions plus the length `n` itself. Seeding the accumulator with `n` and then folding in every index `i` and every element `nums[i]` XORs each integer of `0..n` against each value actually present. Every value that is present matches some index and cancels against it; the missing value pairs with nothing and is all the accumulator holds at the end.

Because the cancellation is bitwise, nothing can overflow in any language — the fold just mixes bits, and no intermediate ever exceeds the width of the operands. That sidesteps the one care point of the sum approach in fixed-width languages (a 64-bit accumulator for the series total) at the cost of an XOR per element instead of an addition.

**Complexity:** `O(n)` time, `O(1)` space.
