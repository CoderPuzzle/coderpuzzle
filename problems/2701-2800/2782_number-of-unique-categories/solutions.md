# Solutions — Number of Unique Categories

## Representative sweep over discovered categories

The handler answers one question — do these two indices share a
category — and sharing a category is an equivalence relation on the
elements: it is reflexive, symmetric, and transitive, because behind
the oracle every element carries one fixed category. Counting unique
categories is therefore counting equivalence classes, and a class needs
only one name: keep a single **representative** index for every
category discovered so far, instead of remembering all of its members.

Scan the elements from `0` to `n - 1`. For each `i`, ask the handler
about `i` against the representatives already on file; if some
representative answers true, `i` joins that category, otherwise `i`
opens a new category and becomes its representative. The scan finds
every join: if `i` shares a category with any earlier element, then by
transitivity it shares one with that element's representative — so
comparing against representatives only, rather than against every
earlier element, never misses a match and never invents one. By
induction the representative list always holds exactly one member per
category present among the processed prefix, so once the scan ends its
length is the answer.

Each call costs budget, so the sweep order matters. Element `i` asks at
most as many queries as there are representatives before it, and the
worst case is the all-distinct input, where every element founds a new
category and the total reaches `0 + 1 + ... + (n-1) = n(n-1)/2` — 4950
queries at `n = 100`, comfortably inside the 10 000 budget (an
all-pairs scan without representatives also peaks there but pays the
full price on every input). Inputs with repeated categories stop early:
the first matching representative ends `i`'s scan, so a single giant
category costs only `n - 1` queries in total. The edge case `n = 1` has
one category and needs no query at all. Categories carry no numeric
meaning — `[2,1,2]` and `[1,2,1]` behave identically — because only the
partition matters, never the labels.

**Complexity:** `O(n²)` time, `O(n)` space.
