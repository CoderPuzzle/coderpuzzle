# Solutions — Check Adjacent Digit Differences

## Adjacent window scan

Scan every adjacent pair of digit characters and compare their numeric
values. The answer is true only when every difference is at most two.

No preprocessing is needed because the input is a string of digits and the
test is purely local.

**Complexity:** `O(n)` time, `O(1)` space.
