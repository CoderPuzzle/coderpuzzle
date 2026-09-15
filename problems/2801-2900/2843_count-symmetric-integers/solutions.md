# Solutions — Count Symmetric Integers

## Digit-half enumeration

The range holds at most `high - low + 1` numbers, and every one of them has
at most five digits on the constraint domain, so each value can simply be
inspected as a decimal string. A number is symmetric exactly when its digit
count is even and the string splits into two equal-length halves whose digit
sums agree; odd-length values are rejected up front. Testing those two
properties per value is the entire algorithm.

The half sums are computed in one pass over the first `n / 2` character
pairs: walking index pairs `(i, n/2 + i)` accumulates the leading and
trailing contributions together without building any extra substring or
prefix array. Summing both halves simultaneously keeps each inspected number
to a single left-to-right sweep of its digits.

Everything stays tiny and in bounds by construction — at most ten thousand
candidates, each with at most five digits, digit sums below 50, and a count
well under 2³¹ — so plain 32-bit arithmetic suffices in every offered
language and no accumulation order can overflow.

**Complexity:** `O((high - low + 1) · D)` time, `O(D)` space — `D` is the
digit count of `high`, bounded by 5, so the sweep is effectively linear in
the range width.
