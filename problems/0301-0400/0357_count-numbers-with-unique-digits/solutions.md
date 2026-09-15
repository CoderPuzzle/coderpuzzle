# Solutions — Count Numbers with Unique Digits

## The per-length falling product

Every `x` in `0 <= x < 10ⁿ` has exactly one length, so count each length
separately and add. `f(0) = 1` is `x = 0` itself; `f(1) = 9` counts the
numbers 1–9; and for `k >= 2` a number of `k` distinct digits is built place
by place: the leading digit has 9 choices (1–9, no leading zero), the next
has 9 (0 joins, one digit spent), the one after 8, and so on —
`f(k) = 9 * 9 * 8 * ... * (9 - k + 2)`. Hint 5's `f(1) = 10` folds `x = 0`
into the one-digit bucket; keeping it apart as `f(0)` is what makes every
length's count a clean product from a 9-way leading digit.

The answer is the prefix sum `f(0) + f(1) + ... + f(min(n, 10))`. For
Example 1 that is `1 + 9 + 81 = 91` — the 81 two-digit numbers with distinct
digits, and the nine `11, 22, ..., 99` of the explanation are precisely the
two-digit range's only casualties. `n = 0` leaves the range at `{0}` alone,
so the answer is `f(0) = 1`. The cap at length 10 is the formula's own: the
next factor in the falling product would be `11 - 11 = 0`, no digit is left
to place, and no longer number can keep its digits distinct.

The method keeps one running product and folds each length in with a single
multiplication and addition — the dynamic-programming view of Hints 3–5,
where each `f(k)` grows from `f(k - 1)` by the factor `11 - k`, and no
backtracking search is ever needed. Under the constraint `n <= 8` the loop
runs at most eight times, and the largest value it touches is
`answer(8) = 2,345,851`, far inside every language's 32-bit range.

**Complexity:** `O(n)` time (effectively `O(1)` at the constraint's `n <= 8`),
`O(1)` space.
