# Solutions — Partitioning Into Minimum Number Of Deci-Binary Numbers

How many deci-binary numbers does it take to sum to `n`? The knee-jerk
instinct is to reason about the value of `n` and search for a partition, but
the deci-binary shape makes the position of each digit, not the magnitude of
the whole number, the only thing that matters — and the answer falls out of
one scan.

## Largest digit

Start with a single digit `d`, as the first hint suggests: the only
deci-binary numbers that fit below it are 0 and 1, so exactly `d` of them
must be added up. With several digits, addition is position-wise — a
deci-binary number contributes either 0 or 1 to each column and carries are
impossible when columns stay below 10 — so each column can be solved
independently and the per-column ones merged vertically into summands: the
column holding the overall maximum digit `m` needs `m` ones, while every
other column needs fewer and can spread its ones freely among those same
`m` summands. Concretely, for layer `k = 1..m`, subtract the number with a
1 in every position whose digit is still at least `k`: each layer is
deci-binary, and after `m` subtractions every digit is 0, exactly as the
second hint describes.

That construction also proves optimality. No deci-binary summand can
contribute more than 1 to the maximum digit's column, so `k` summands leave
that column at most `k`; the column holding `m` therefore forces at least
`m` summands, and the layer construction attains `m`. The minimum count is
exactly `m`, and computing it never touches arithmetic on `n` at all: walk
the string once, keep the largest digit seen, return it — an `O(1)`-space
scan that is indifferent to the 10⁵-length bound.

**Complexity:** `O(n)` time, `O(1)` extra space.
