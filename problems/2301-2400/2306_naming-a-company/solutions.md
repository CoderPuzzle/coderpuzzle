# Solutions — Naming a Company

## First-letter groups and disjoint suffix counts

A swap only produces two fresh names when the chosen names start with
different letters: if they share the first letter, each swapped result is
just the other original name, so both already exist and nothing is gained.
Group the names by first letter and collect each group's suffixes (the name
minus its first letter) into a set — all names are unique, so within a group
every suffix is distinct. For two letters `a` and `b`, a selection is valid
exactly when the a-side suffix is not in b's set and the b-side suffix is not
in a's set; same-letter pairs therefore contribute nothing.

For each unordered letter pair, let `inter` be the number of suffixes the two
sets share. Inclusion-exclusion turns the usable counts into sizes minus the
overlap: `|A \ B| = |A| - inter` and `|B \ A| = |B| - inter`. Every surviving
ordered selection also lands on a distinct company name: the concatenation
holds exactly one space, and splitting on it recovers the two halves, whose
first letters differ — so two different selections can never collide. The
pair thus adds `2 * (|A| - inter) * (|B| - inter)`, where the factor 2 covers
both orders. Example 1 works out by hand: the coffee and toffee groups share
"offee", so c-t adds 0, while d-t adds 4 and c-d adds 2, totalling 6. The
answer can approach `n² ≈ 2.5 * 10⁹`, past 32-bit range, so fixed-width
languages accumulate in 64-bit integers; JavaScript numbers stay exact at
this scale, well under `2⁵³`.

Building the 26 sets reads the input once. Only `26` choose `2 = 325` pairs
exist, and each intersection scans one of its two sets, so the sweep costs at
most `25 * n` set probes beyond grouping.

**Complexity:** `O(total characters + 26 * n)` time, `O(total characters)`
space.
