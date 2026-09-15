# Solutions — Maximum Subarray Sum After at Most K Swaps

## Fenwick order statistics over each subarray boundary

Fix the left endpoint and extend the right endpoint one position at a time.
Two Fenwick trees hold the values inside and outside the current subarray,
supporting order statistics and prefix sums. For `t` swaps, the gain is the
sum of the `t` largest outside values minus the sum of the `t` smallest inside
values.

The profitable swap count is the largest `t <= k` whose `t`th outside value
is greater than the `t`th inside value. Moving one boundary value changes this
count by at most one, so it can be maintained while the Fenwick trees change
instead of binary-searching from scratch. Sums use 64-bit arithmetic; their
absolute values are at most `1500 * 10⁵`, which is also exactly representable
by JavaScript numbers.

**Complexity:** `O(n² log n)` time with the maintained count (`O(n² log² n)`
where each window's count is binary-searched), `O(n)` space.
