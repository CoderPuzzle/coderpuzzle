# Solutions — Maximum Number of Groups Getting Fresh Donuts

A group is happy exactly when the number of donuts served before it is a
multiple of `batchSize`, so an ordering's happy count is decided entirely by
the group sizes modulo `batchSize` — the ordering problem collapses to
partitioning the multiset of remainders.

## Pair complements, then search the leftovers with memoized DP

Only the remainders matter, so first tally them into a frequency table.
Every remainder-0 group starts its own fresh batch no matter where it sits,
so all of them are happy outright. Next, remainders `i` and `batchSize - i`
sum to a full batch: pairing off `min` of the two counts turns each pair
into one more happy group, and for even `batchSize` the self-complementary
class `batchSize/2` pairs with itself the same way. This pairing never costs
optimality — an exchange argument moves any optimal solution into this
shape — and it shrinks the search space enormously, because afterwards at
most one class of each complementary pair is still populated.

What remains is a small exact search. The state is the leftover count vector
together with the current batch's running remainder `r`; placing a group of
remainder `m` earns a happy group exactly when `r == 0` and moves to
remainder `(r + m) mod batchSize`. The recursion memoizes on the packed
state — each class count fits in 5 bits since there are at most 30 groups —
so even the worst case, `batchSize` 9 with the leftovers balanced across all
four complementary pairs, visits only a few times ten thousand states.
Recursion depth is bounded by the number of leftover groups, at most 30.

**Complexity:** `O(P · batchSize²)` time and space, where `P` is the number
of leftover count vectors — at most `31^⌈batchSize/2⌉` products, and in
practice far fewer because the total is capped at 30.
