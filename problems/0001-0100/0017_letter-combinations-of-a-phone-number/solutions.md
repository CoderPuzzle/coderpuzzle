# Solutions — Letter Combinations of a Phone Number

## Depth-first walk over digit positions

Every combination picks exactly one letter per digit, so the answer space is a tree: depth is the digit position, and the children of a node are the letters of the next digit's group. A depth-first walk that appends a letter, recurses on the remaining digits, then removes the letter again enumerates every root-to-leaf path exactly once — which is precisely a combination. Because the children are visited in the group's alphabetical order and the earlier digits sit higher in the tree, the letters of earlier digits vary slowest and the output lands in the canonical order the statement pins.

The walk keeps one shared `current` buffer instead of building a fresh string at every node. Each recursion level appends its letter before descending and pops it after returning, so on arrival at a leaf the buffer holds exactly the path taken, and it is copied into the results only there. This is what keeps the bookkeeping linear in the depth rather than in the number of partial combinations.

The empty string is decided before any walking: it has zero digits, hence zero letter combinations, and the method returns `[]` — a list with no elements, not a list holding the empty string. That guard also protects the walk itself, which would otherwise happily descend into an empty tree and emit one empty combination.

**Complexity:** `O(4ⁿ · n)` time, `O(n)` auxiliary space excluding the output.
