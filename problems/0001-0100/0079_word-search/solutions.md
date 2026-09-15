# Solutions — Word Search

## Depth-first backtracking over the grid

A candidate path is a chain of horizontally or vertically adjacent cells spelling `word` letter by letter, so the method treats every cell as a possible first letter and walks depth-first from it, consuming one letter per step and stepping only to the four neighbors. The walk returns true the moment it consumes the final letter — that path exists — and false when no neighbor supplies the next one, at which point the caller tries its next branch. If every starting cell is exhausted without success, the word is not in the grid.

The no-reuse rule is enforced by the board itself: each level overwrites its cell with `"#"`, a string no letter cell can equal, so the grid doubles as the visited set and a path can never fold back onto a cell it already used. Retreating restores the cell's letter before returning, which reopens it for sibling branches and leaves the board intact for the remaining starting cells. Restoring matters twice over — a false start that stayed marked would corrupt every later search, not just its own.

The recursion is bounded by the word length, at most 15, so plain recursion is safe without an explicit stack. After the first step each level has at most three live directions (the cell it came from is marked), which is what caps the explored tree; the 6 x 6 ceiling keeps even the worst false-start-heavy boards small.

**Complexity:** `O(m · n · 3^L)` time for an `m x n` board and word length `L`, `O(L)` auxiliary space for the recursion stack.
