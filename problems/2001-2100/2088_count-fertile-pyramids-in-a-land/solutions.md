# Solutions — Count Fertile Pyramids in a Land

## Dynamic programming from each base direction

Process rows from a pyramid's base toward its apex. A fertile cell has height one by itself. If the cell directly toward the base is fertile, its maximum height is one plus the smaller maximum height of the two diagonal cells toward the base. A height `h` contributes `h - 1` valid plots because plots must contain more than one cell.

Run the same recurrence bottom-to-top for regular pyramids and top-to-bottom for inverse pyramids. Only the previous processed row is needed in each pass.

**Complexity:** `O(m * n)` time and `O(n)` auxiliary space.
