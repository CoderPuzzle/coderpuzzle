# Solutions — Minimum Subsequence in Non-Increasing Order

## Take the largest elements until the taken sum passes half

The chosen subsequence must sum to strictly more than the sum of the
elements left behind, which is the same as requiring twice the chosen sum
to exceed the total sum of the whole array. Since every element is
positive, the greedy choice is optimal: taking the largest elements
minimizes the number of elements needed to cross that half-total, and for
a fixed number of elements the largest ones maximize the sum — which is
exactly the tie-break the statement asks for.

Sort `nums` in descending order and accumulate a running sum from the
front. Keep taking elements while `2 * running_sum <= total`; the moment
the running sum strictly exceeds half the total, the elements taken so
far form the answer. They are already in non-increasing order because the
array was sorted that way, and the uniqueness guarantee means no further
tie-breaking is required.

**Complexity:** `O(n log n)` time from the sort, `O(n)` space for the
result, where `n` is the length of `nums`.
