# Solutions — Minimum Element After Replacement With Digit Sum

Replacement acts on each element independently and the digit sum of a
number is never larger than the number itself, so the answer is just the
smallest per-element digit sum — nothing about the array's order or
length couples the elements together.

## Replace each element with its digit sum

Walk `nums` once and reduce every value to its digit sum: repeatedly take
the last digit with `% 10` and drop it with integer division by 10 until
nothing remains, then add the digits up. Keep a running minimum of these
sums and return it after the walk. The hint's string route — convert the
element to text and add its characters back as digits — computes exactly
the same quantity; only the digit-extraction mechanism differs.

Every element shrinks under replacement (a multi-digit number's digit sum
is strictly smaller than the number), so the running minimum can only
decrease and no second pass or extra structure is needed. With at most
100 elements of at most five digits each, the work is a few hundred
arithmetic operations and the only stored state is the current best sum,
which never exceeds 36 (`9999`'s digit sum) — comfortably inside every
language's native integer range.

**Complexity:** `O(n · d)` time, `O(1)` space, where `d <= 5` is the
digit count of the largest element.
