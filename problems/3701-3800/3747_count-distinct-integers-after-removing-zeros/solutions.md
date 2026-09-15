# Solutions — Count Distinct Integers After Removing Zeros

## Zero-free counting scan

Stripping zeros never invents a new value: what gets written down for `x` is
always an integer whose decimal representation contains no zero, and every
zero-free value in `[1, n]` shows up because it is written down by itself.
So the set of written values is exactly the zero-free integers up to `n`,
and the task collapses to counting them — no set of seen values is ever
built.

Counting proceeds digit by digit over `n`'s decimal digits, walking from
the most significant side with a running multiple of nine. Every shorter
length contributes its full block first: there are `9^k` zero-free numbers
with exactly `k` digits (nine choices per position). Then, along the
digits of `n`, a prefix that has matched `n` so far can branch to any
smaller leading digit `d` from 1 to one below the current digit; each such
branch completes freely, adding `(d - 1) * 9^(remaining)` values where
`remaining` counts the positions left after this one. The walk stops dead
the moment `n` itself shows a zero digit — once the prefix already carries
a zero, nothing below it can be zero-free — and if the walk survives all
the way to the last digit without meeting a zero, `n` itself is zero-free
and closes the count as one final value.

For `n = 110` the scan counts `9 + 81 = 90`: every zero-free number of one
or two digits fits below `n`, while the tight walk matches the leading
digits `1` and `1` without ever finding a smaller nonzero digit to branch
to, and dies on the trailing `0` before it could count `n` itself — so
nothing is added and the answer stays 90. A value like `n = 303` banks
`9 + 81 + (3 - 1) * 81 = 252`: after the full one- and two-digit blocks,
the tight walk branches to leading digits 1 and 2 worth two full
two-position completions each, then stops on the interior zero. The scan
does one constant-time pass over at most fifteen digits.

**Complexity:** `O(log n)` time, `O(1)` space.
