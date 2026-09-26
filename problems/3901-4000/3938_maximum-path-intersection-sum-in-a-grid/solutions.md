# Solutions — Maximum Path Intersection Sum in a Grid

Every shared set is either one interior cell or a contiguous row/column segment of length at least two. Scan each row and column with Kadane's recurrence while admitting candidates only after a second element, and compare them with every interior singleton.

## Row and column Kadane scans

Every shared set is either one interior cell or a contiguous row/column segment of length at least two. Scan each row and column with Kadane's recurrence while admitting candidates only after a second element, and compare them with every interior singleton.

![On the 5x4 example, a right/down path from (0,0) and a right/up path from (4,0) share exactly row 2, cols 1-3 — cells 2, −1, 3 summing to the answer 4.](figures/solution-shared-row-segment.svg)

**Complexity:** `O(mn) time, O(1) space`.
