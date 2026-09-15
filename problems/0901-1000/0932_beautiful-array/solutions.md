# Solutions — Beautiful Array

The definition admits many arrays for one `n`, and the pinned answer is the classic
parity divide-and-conquer built from the bottom up: each pass turns the current
array into its odd images `2 * x - 1` followed by its even images `2 * x`, and the
construction closes with one sweep that keeps the values `<= n`.

## Odds then evens, doubled from [1]

Why the doubling produces a beautiful array: within the front block every value is
odd and within the back block every value is even, so an average of one value from
each block is an odd sum, which can never equal `2 * nums[k]` — an even number — so
no block-crossing pair can violate the rule at any middle index. Inside one block,
values are `2 * x - 1` (or `2 * x`) over the same smaller array, and
`2 * (2 * k - 1) == (2 * i - 1) + (2 * j - 1)` simplifies to
`2 * k == i + j` — exactly the violation one level down — so induction from the base
`[1]`, which is beautiful, rules out in-block violations at every size. When the
current array holds `1..m`, the front block carries `1, 3, ..., 2 * m - 1` and the
back block `2, 4, ..., 2 * m`, so the doubled array holds each value of `1..2 * m`
exactly once: a genuine permutation at every size.

Starting from `[1]`, doubling keeps that property for the range `1..2^d`, so once
the array holds at least `n` values it holds exactly `1..2^d`, and keeping the
values `<= n` leaves exactly `1..n`. That keep also reproduces the top-down
recursion — beautiful(n) as the odd images of beautiful(`ceil(n / 2)`) followed by
the even images of beautiful(`floor(n / 2)`) — because `2 * x - 1` exceeds `n`
exactly when `x` exceeds `ceil(n / 2)`, and `2 * x` exceeds `n` exactly when `x`
exceeds `floor(n / 2)`: dropping the too-large values at one level drops precisely
the images the recursion would never have generated, at every level below too.

Each doubling writes twice the current length, and the lengths form the chain
`1, 2, 4, ..., 2^d` with `2^d < 2 * n`, so the whole build performs fewer than
`4 * n` writes; the final keep reads the array once more. For `n = 1` the loop body
never runs and `[1]` returns as is.

**Complexity:** `O(n)` time, `O(n)` space.
