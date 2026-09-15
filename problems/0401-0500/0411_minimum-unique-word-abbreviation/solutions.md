# Solutions — Minimum Unique Word Abbreviation

## Diff masks and a bounded search over kept positions

An abbreviation of `target` is really a choice of which positions to keep:
every maximal run of unkept positions becomes one number, so each of the
`2^m` kept-position sets spells exactly one abbreviation. Which dictionary
words can it collide with? Only words of the same length `m`, and the
collision question collapses each such word into a single integer — a diff
mask with bit `i` set wherever the word's letter differs from `target`'s. If
the abbreviation keeps exactly the positions in `K`, it abbreviates the word
precisely when `K & diff == 0`: every kept letter matched by accident. The
task is therefore to find the kept set with the cheapest spelling that hits
every diff mask, and only minimal masks need to be honored — a mask that is a
superset of another is hit by anything that hits its subset.

The search walks `target` position by position, trying the abbreviate branch
first and threading along only the still-unhit masks, and two observations
keep it small. Skipping position `p` kills every pending mask that has no set
bit at `p` or beyond, so such a branch dies on the spot; and any partial
choice already costs `letters kept + runs closed + an open run + the one
extra letter that a still-unhit mask will eventually force`, so the walk cuts
off the moment that floor passes the best length found. Seeding the best with
the bare word — always valid, since the dictionary never contains `target`
itself — makes the empty-dictionary case fall out instantly: the dive that
abbreviates everything reaches a valid leaf of length 1 and nothing cheaper
can exist.

The answer is the minimum `(length, string)` pair over all valid leaves, so
it does not depend on the order the walk visits them in: shortest first,
ties to the lexicographically smallest abbreviation, exactly as the statement
pins. Spelling a leaf out turns each kept letter into itself and each
maximal unkept run into its decimal length. The walk can in principle visit
all `2^m` kept sets, each doing `O(n)` mask arithmetic — which is what the
constraint `log2(n) + m <= 21` caps at about two million operations.

**Complexity:** `O(2^m * n)` time in the worst case (the pruning usually
visits far less), `O(m + n)` space — `m` levels of recursion over `n` masks.
