# Solutions — Find the Length of the Longest Common Prefix

Both solutions earn their speed from the same restatement: a shared leading
slice of length `L` is nothing beyond agreement on the first `L` decimal
digits. The sort banks that restatement into an order — merge every value
from both arrays as a digit string, sort lexicographically, and the two
values behind the deepest agreement end up adjacent, so one scan of
neighboring slots settles the whole cross-product search. The hash set skips
ordering entirely and asks its question point-blank — is this digit run
already on file from `arr1`? — paying a flat membership lookup instead.

## Sorted digit strings

Agreement on the first `L` digits is exactly the property that lexicographic
order preserves, so the all-pairs hunt can be delegated to a sort: write
every element of both arrays as a digit string tagged with its source array,
sort the whole company as strings, and read the answer off adjacent slots.

The order must be lexicographic — never numeric. Only string order keeps a
prefix family contiguous: `7`, `74`, `749`, `7491` all precede `75` because
`"4" < "5"` at the second digit, while numeric order would interleave `75`
into the `74…` family and split it in two. The tags ride along untouched;
the sort never looks at them, and no value is ever compared as a number.

Why neighbors suffice: let `L` be the deepest agreement any cross pair
manages, realized by `x` from `arr1` and `y` from `arr2`. Every digit string
extending that shared `L`-digit prefix occupies one contiguous block of the
sorted order, and `x` and `y` both sit in that block — so walking from one
to the other crosses a source boundary at some adjacent slot, and that
cross-source neighboring pair agrees on at least `L` digits. The converse is
free: a cross-source neighboring pair is itself a cross pair, so whatever it
agrees on is achievable. The maximum over cross-source neighbors is thus
exactly the all-pairs maximum.

The scan compares each entry only with its sorted predecessor, skipping
neighbors whose tags match, and counts matching leading digits up to the
first divergence. In the first worked example (`[7, 74, 749]` against
`[7491, 75]`) the merged order runs `7`, `74`, `749`, `7491`, `75` — the
first three from `arr1`, the last two from `arr2`. The cross-source
neighbors are `749` against `7491`, agreeing on three digits, and `7491`
against `75`, agreeing on one; the deepest of those, 3, is the answer.

**Complexity:** `O(N * (log N + D))` time with `N = |arr1| + |arr2|` and
`D <= 9` digits, `O(N * D)` space.

## Hash set of decimal prefixes

Two integers share a common prefix of length `L` exactly when their first `L` digits agree, so the whole cross-product question collapses to set membership: put every prefix of every element of `arr1` into a hash set, then test prefixes of `arr2` elements against it.

Insertion folds digits left to right (`v = v * 10 + digit`) and adds each intermediate value, so one pass over `arr1` registers up to `D` prefixes per number, with `D <= 9` since values are at most 10^8. For each `y` in `arr2`, walk its prefixes in increasing length and track the longest one found in the set.

The scan over `arr2` can stop at the first miss: prefixes nest, so once a length-L prefix of `y` is absent from the set, no longer prefix of `y` can match any prefix of any `arr1` element either. The break also keeps queries with tiny shared prefixes from grinding through all 9 digits.

**Complexity:** `O((|arr1| + |arr2|) * D)` time, `O(|arr1| * D)` space.
