# Solutions — Find the Sum of Encrypted Integers

## Largest digit times a repunit

Encrypting a number keeps its digit count and replaces every digit with the
largest one, so the result always factors as `m * p` where `m` is the largest
digit and `p` is the repunit with the same length as the number: `encrypt(523)
= 5 * 111 = 555`. Both factors fall out of a single arithmetic scan — peel off
digits with `% 10` and `/= 10`, tracking the running maximum digit while a
counter grows as `0, 1, 11, 111, ...` via `p = p * 10 + 1`.

The port sums `m * p` over the array as it goes; no string conversion and no
per-digit buffer are needed. With `nums[i] <= 1000` the loop body runs at most
four times per element and the total stays below `50 * 1111 = 55550`, well
inside every language's integer range.

**Complexity:** `O(n)` time, `O(1)` space.
