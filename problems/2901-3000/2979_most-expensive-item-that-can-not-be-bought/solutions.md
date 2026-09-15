# Solutions — Most Expensive Item That Can Not Be Bought

## Reachability sieve up to the prime product

Two hints structure the search. First, every price above
`primeOne * primeTwo` is buyable — with that many coins one can always
rearrange into a combination for the next price — so the answer, if it
exists, hides inside `0..primeOne * primeTwo`. Second, buying is
self-reproducing: whenever price `i` is buyable, so are `i + primeOne`
and `i + primeTwo`. Both facts point at a reachability sieve.

The sieve walks prices `1..primeOne * primeTwo` in order. Price `p` is
buyable exactly when dropping one coin leaves a buyable price, i.e. when
`p - primeOne` or `p - primeTwo` (whichever exist) is already marked
reachable; price 0 anchors the sieve as trivially buyable — the empty
combination. Prices that never light up are unbuyable, and the walk
remembers the largest one seen. Unbuyable prices do exist (price 1, since
both denominations exceed 1), so the returned maximum is always at least

1. The product is bounded by the constraints under `10⁵`, so the sieve
   makes one linear pass over a small array, and every price involved stays
   below `10⁵` — comfortably inside 32-bit range in every language.

**Complexity:** `O(primeOne * primeTwo)` time, `O(primeOne * primeTwo)`
space.
