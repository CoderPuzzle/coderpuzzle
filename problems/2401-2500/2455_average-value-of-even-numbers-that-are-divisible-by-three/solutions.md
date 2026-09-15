# Solutions — Average Value of Even Numbers That Are Divisible by Three

## Divisible by six

A positive integer is even and divisible by 3 exactly when it is
divisible by `lcm(2, 3) = 6` (hint 2), so the two requirements collapse
into a single test. Walking the array once and summing the values that
pass it while counting them gives both ingredients of the average.

The average is explicitly floored, so the sum is divided by the count
with integer division — truncation toward zero equals the floor because
both operands are non-negative. When no element qualifies, the count is
zero and the statement asks for `0` in place of an undefined average.
Every value is at most `1000` and there are at most `1000` of them, so
the running sum never leaves a 32-bit integer.

**Complexity:** `O(n)` time, `O(1)` space.
