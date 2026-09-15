# Solutions — Permutations

## Backtracking over sorted candidates

Every permutation assigns each position one of the not-yet-used elements, so the answer space is a tree: the depth is the position being filled and the children of a node are the elements still unassigned. A depth-first walk that appends an element, recurses on the remaining positions, then pops the element again enumerates each root-to-leaf path exactly once, and each path is one permutation. Sorting the values first and trying the candidates in ascending order makes the earlier positions vary slowest, so the walk emits the list already in the ascending lexicographic order the statement pins — no post-sort of the output is needed.

The walk keeps one shared `current` buffer plus a `used` mark per element instead of scanning the partial permutation for membership at every step. Each recursion level marks its choice before descending and unmarks it after returning, so on arrival at a leaf the buffer holds exactly the path taken and is copied into the results only there. The marks are what keep the branching cheap: deciding which candidates remain is a constant-time check per element rather than a linear scan of `current`.

The elements are guaranteed distinct, so no two paths ever spell the same permutation and nothing needs de-duplicating. At `n` elements the tree has `n!` leaves; with `n` capped at 6 that is at most 720 permutations, and each is copied once at its leaf.

**Complexity:** `O(n · n!)` time, `O(n)` auxiliary space excluding the output.
