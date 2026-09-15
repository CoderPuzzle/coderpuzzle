# Solutions — Move Pieces to Obtain a String

## Two-Pointer Piece Matching with Direction Constraints

Pieces never pass through each other: an `L` moving left and an `R` moving right can only stop at blanks, so the relative order of the pieces is invariant. Hence the `k`-th non-blank character in `start` must match the `k`-th non-blank character in `target`, and if the counts of `L`/`R` pieces differ the answer is immediately false.

Given matched pieces, the only remaining freedom is position. An `L` piece slides only leftward, so its position in `start` must be at least its position in `target` (`i >= j`); an `R` slides only rightward, so `i <= j`. These conditions are not just necessary but sufficient: blanks impose no ordering among pieces, so each piece can independently walk to its destination — pieces further along never block, because the matched ordering forces `L` pieces to travel left into space vacated by pieces matched further left, and vice versa for `R`. Concretely, one can always find a currently movable piece (the leftmost `L` or rightmost `R` among those not yet home) until all arrive.

![The example start _L__R__R_ above the target L______RR with matching arrows: the L travels from index 1 to 0, the first R from 4 to 7, and the last R from 7 to 8 — every move agrees with its piece's allowed direction.](figures/solution-piece-matching.svg)

The implementation extracts `(index, character)` pairs of non-blank characters from both strings in one pass each, checks equal lengths, then walks the two lists in lockstep verifying character equality and the direction-dependent index inequality. An `L` that would need to move right, or an `R` that would need to move left, fails the check; strings that are all blanks on both sides trivially succeed. This avoids simulating moves entirely, handling `n` up to `10^5` in linear time.

**Complexity:** `O(n)` time, `O(n)` space.
