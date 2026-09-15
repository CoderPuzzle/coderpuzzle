# Solutions — Check Balanced String

Balance here depends only on two totals: the sum of the digits at even
indices and the sum of the digits at odd indices. Nothing else about the
string matters — which digit produced which contribution, or the order the
totals are reached in — and the two totals can even share a single
accumulator instead of being stored side by side.

## One pass, one signed counter

Walk `num` once, adding each digit that sits at an even index and
subtracting each digit that sits at an odd index. The two sums are equal
exactly when this signed total ends back at zero, which is the definition
of balanced, so the answer is a single comparison against zero after the
loop. Each character is converted to its digit value on the fly; no
parsing into a list of integers is needed.

The counter is bounded by the largest total either side can reach: at most
50 digits of value 9 give 450 in absolute value, far inside a 32-bit
integer in every language, so no wider arithmetic is required.

**Complexity:** `O(n)` time, `O(1)` extra space.
