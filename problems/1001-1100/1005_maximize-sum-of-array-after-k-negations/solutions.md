# Solutions — Maximize Sum Of Array After K Negations

Flipping the sign of the most negative value on hand always raises the
sum by the most, so a greedy sweep over the array sorted ascending
resolves as many of the k negations as possible against negative values
first. Once no negative values remain, spending an operation twice on
the same value cancels out and costs nothing, so only the parity of
whatever negations are left over matters — and when it is odd, the best
place to absorb that one leftover flip is whichever value now has the
smallest absolute size, since flipping it costs the least.

## Sort, negate the most negative values, then fix any leftover parity

Sort `nums` ascending so the most negative values lead. Walk the array
from the front, and while the current value is still negative and
operations remain, negate it and consume one operation; this always
pairs an operation with the value that gains the most from being
flipped, and it naturally stops as soon as either the operations run out
or the walk reaches a nonnegative value. Sum the array once this walk is
done.

Any operations left over at that point can only be spent on nonnegative
values (or reused on a value already flipped), and flipping the same
value twice restores it exactly — so only whether the leftover count is
odd or even changes the sum. An even leftover cancels out completely,
including the case where a zero is sitting in the array: negating zero
never changes it, so a leftover count that lands on a zero costs nothing
regardless of parity. When the leftover count is odd, the sum drops by
exactly twice the smallest absolute value anywhere in the current array,
since flipping that one value the extra time is the cheapest possible
adjustment; scanning the whole array (rather than just the untouched
suffix) for that minimum covers the case where the smallest magnitude
ended up among the values already flipped.

**Complexity:** `O(n log n)` time, `O(1)` extra space (beyond the sort),
where `n` is the length of `nums`.
