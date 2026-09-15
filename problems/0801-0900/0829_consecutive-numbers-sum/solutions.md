# Solutions — Consecutive Numbers Sum

## Enumerate the run length

A run of `L` consecutive positive integers starting at `a` sums to
`L*a + L*(L-1)/2` — `L` copies of the start plus the fixed staircase
`0 + 1 + ... + (L-1)`. Solving `n = L*a + L*(L-1)/2` for `a` shows that a
length-`L` representation exists exactly when `n - L*(L-1)/2` is a
positive multiple of `L`. So the answer is the number of lengths `L` that
pass that divisibility test: walk `L` upward and count.

The walk is short because the staircase grows quadratically. The smallest
sum any length-`L` run can reach is `1 + 2 + ... + L = L*(L+1)/2`; once
that minimum passes `n` no run fits and the loop stops, capping `L` near
`sqrt(2n)` — about 44721 iterations at `n = 10^9`. Below the cap the
remainder `n - L*(L-1)/2` is at least `L`, so divisibility alone pins
`a >= 1` and positivity never needs a separate check. Length 1 divides
unconditionally (`a = n`), which is why every `n` answers at least 1 and
the powers of two, which no multi-term run ever reaches, answer exactly
1; the same count happens to equal the number of odd divisors of `n`,
though the enumeration never needs the identity.

One bound detail: at `n = 10^9` the loop counter reaches 44720 and the
product `L*(L+1)` brushes `2 * 10^9` — just inside signed 32-bit range
but with no headroom, so the solutions hold the intermediate in a wider
type (`long` in Java, `long long` in C++, `i64` in Rust; Go's native
`int` and the doubles of JavaScript and TypeScript carry it natively, and
Python's integers are unbounded).

**Complexity:** `O(√n)` time, `O(1)` space.
