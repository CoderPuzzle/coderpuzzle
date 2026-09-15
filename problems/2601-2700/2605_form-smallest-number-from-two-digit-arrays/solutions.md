# Solutions — Form Smallest Number From Two Digit Arrays

## Common Digit or Ordered Pair

A one-digit answer exists exactly when the two arrays share a digit, and any
single shared digit beats every two-digit number, so the smallest common digit
settles that case outright. The presence test is a hash set (or a 10-slot
boolean table), scanned once for the minimum intersection element.

With no overlap the answer has two digits — one from each array. Only each
array's own minimum can possibly matter: a two-digit number's leading digit
dominates its comparison, so pairing `min(nums1)` and `min(nums2)` in both
orders (`10a + b` vs `10b + a`) and keeping the smaller constructs the
smallest number. Digits are at most 9, so the arithmetic never approaches
32-bit limits.

**Complexity:** `O(len(nums1) + len(nums2))` time, `O(1)` space.
