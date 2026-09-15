# Solutions — Find the Smallest Balanced Index

## Prefix sums and saturated suffix products

For each index i the definition compares two quantities: the sum of the
elements before i and the product of the elements after i. A left-to-right
scan keeps the first in `O(1)` with a running total. The second is prepared
ahead of time in one right-to-left pass, storing the suffix products in an
array.

The product of a long suffix can overflow any fixed-width integer, but only
equalities matter. A prefix sum never exceeds the total sum of `nums`, so
once a suffix product grows beyond `total + 1` it can never match any prefix
sum. Every suffix value is therefore saturated at `total + 1` as it is
computed, which keeps every intermediate inside a 64-bit integer while
leaving all genuine equalities intact.

The scan then returns the first index whose running prefix sum equals the
stored suffix product, or -1 when no index qualifies. Each direction of the
array is visited exactly once, and the only stored data is the suffix array.

**Complexity:** `O(n)` time, `O(n)` space.
