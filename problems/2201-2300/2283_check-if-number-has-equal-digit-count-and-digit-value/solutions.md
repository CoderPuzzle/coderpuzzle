# Solutions — Check if Number Has Equal Digit Count and Digit Value

## Count once, compare per index

For each index `i` the requirement involves only one quantity beyond the
digit recorded there: how many times each digit occurs in `num`. A single
counting pass over the string gathers everything any index will ever ask
about — a fixed ten-slot tally, one slot per digit, is filled as the
characters stream by and never depends on the input length.

Verification is then a second linear scan: position `i` passes exactly when
the tally for digit `i` equals the digit written at `num[i]`, and the answer
is false the moment any position disagrees. Every index gets checked,
including those whose requirement is zero occurrences of a digit.

**Complexity:** `O(n)` time, `O(1)` space.
