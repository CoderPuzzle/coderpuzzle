# Solutions — Sort Features by Popularity

The answer's order is a total order: popularity descending, then original
index ascending. Nothing is filtered — a feature no response mentions
still appears, with popularity zero, after every popular one. Both facts
come straight out of one counting stage and one ordering stage.

## Count distinct response words, then sort by popularity and index

Seed a hash map with every feature at popularity zero. Walk the responses
one at a time: split the response into its words, keep only the distinct
ones — a feature repeated inside a single response is credited once —
and increment exactly those distinct words that the map already holds.
Membership is whole-word equality, which the statement's own example
pins down: `"locker like touch"` does not make `"lock"` popular. Because
the map was seeded with the features themselves, non-feature words are
rejected without a second lookup structure, and a feature's popularity
ends as the number of responses whose word set contains it.

Ordering is a sort of the feature indices under the statement's exact
rule: higher popularity first, and on equal popularity the smaller
original index first. The comparator is total on distinct indices, so no
sort-stability assumption can leak in — unstable sorts such as Go's
`sort.Slice` or C++ `std::sort` produce the identical permutation. A
feature never named keeps its seeded zero and lands, in original order,
after everything that was named, exactly as Example 2 shows.

**Complexity:** `O(n log n + L)` time where `n` is the number of features
and `L` the total length of the responses, `O(n + w)` space with `w` the
word count of the largest response.
