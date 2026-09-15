# Solutions — Smallest Divisible Digit Product II

## Factor `t`, then greedily raise the shortest suffix

A product of nonzero digits only ever carries the primes 2, 3, 5 and 7, so
if `t` has any other prime factor no zero-free number can work and the
answer is `-1`. Otherwise `t` reduces to small exponent targets over 2, 3,
5, 7 — the factors of anything up to `10^14` fit in counts of 47, 29, 20
and 16 — and every digit is itself a tiny exponent vector: `8` is three
twos, `9` two threes, `6` one of each. Comparing prefix exponent sums of
`num` against the targets replaces every divisibility question with four
small integer comparisons, so no big-number arithmetic is ever needed.

If `num` is already zero-free and its exponent sums cover the targets, it
is its own answer. Otherwise the smallest qualifying number of the same
length keeps the longest possible zero-free prefix of `num`, raises exactly
one digit past `num`'s digit there, and fills the rest freely — so we scan
split points right to left and try digits in increasing order. A split is
workable when the leftover target still fits in the free positions, and the
cheapest cover of a leftover costs `fives + sevens + ceil(twos/3) +
ceil(threes/2)` digits, because a 5 or a 7 always burns a dedicated digit
while eights, nines, and an occasional six-trade cover the twos and threes
— never more than about 67 digits in total. Since the leftover shrinks
while the free tail grows as the split moves left, only a handful of
rightmost splits can fail: the first workable split, with the smallest
raised digit and the lexicographically smallest tail (as many `1`s as
possible, then the smallest covering digits in ascending order), is the
answer.

When no same-length split works, the smallest qualifying number is longer
than `num`: the shortest usable length is `max(n + 1, cheapest cover of the
full target)`, and the best string of that length is leading `1`s with just
enough covering digits at the very end, built by the same smallest-digit-
first rule. Every step is a linear pass over the digits plus constant-time
exponent bookkeeping.

**Complexity:** `O(n)` time, `O(n)` space, where `n = num.length`.
