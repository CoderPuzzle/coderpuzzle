# Solutions — Non-decreasing Subsequences

## Take-or-skip backtracking into a result set

Every index of `nums` faces one binary decision — take the value into the
subsequence or skip it — so the recursion's leaves are exactly the `2^n`
subsets of indices. A take is allowed only when the value does not decrease,
which prunes every path the moment it would violate the order, and a leaf
holding at least two collected values is one answer: each subset of indices is
examined at exactly one leaf, so nothing is missed and nothing is counted
twice before deduplication.

Equal values are what make the answer smaller than a power set. In
`[4,6,7,7]` the two 7s reach the sequence `[4,6,7]` through either copy, and
in `[4,4,3,2,1]` the surviving `[4,4]` exists only because a subsequence may
repeat a value it already holds. Rather than pruning those paths with a
per-level used set, the search lets them run and drops each finished sequence
into a hash set keyed by the sequence itself — duplicate paths land on the
same member, so the honest deduplication falls out of the container.

Sorting the set's contents then emits the order the statement pins: ascending
lexicographic by the sequence itself, element by element, a sequence before
its own extensions. With `n <= 15` the tree has at most 32,768 leaves, each
materialized in `O(n)`.

**Complexity:** `O(2^n · n)` time to generate the collected sequences, plus
sorting the output; `O(2^n · n)` space for the set and the answer.
