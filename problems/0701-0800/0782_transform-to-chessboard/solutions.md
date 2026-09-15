# Solutions — Transform to Chessboard

Row and column swaps never change what a board contains, only where each row
and column sits, so the question splits in two: which boards hold the right
material at all, and how cheaply that material can be re-seated. One
rectangle invariant decides the first half, and two alternating-pattern
counts decide the second.

## Rectangle invariant and alternating-pattern counts

The XOR of the four corners of any axis-aligned rectangle survives every row
and column swap — a swap only relabels which rows or columns hold which
entries — and on a chessboard that XOR is always 0, because opposite corners
of a rectangle on alternating cells always agree. A solvable board must
therefore satisfy the same invariant, which forces every row to be either
equal to row 0 or its exact complement (and likewise every column): one pass
over the board rejects everything else. What survives carries exactly two
row patterns and two column patterns, and the first row's own content
decides the rest — an alternating pattern of length n holds n/2 ones, or
(n+1)/2 when n is odd, so the first row and the first column must each land
on one of those two counts to be re-seatable at all.

Placement is then the only remaining cost, and the first row and first
column report it fully. Count the positions where the first row already
holds the value that the alternating pattern starting with 0 assigns: each
mismatching column holds exactly what some other mismatching column needs,
so one swap repairs two and the budget is half the mismatches. The same
count on the first column prices the row swaps. When n is even, both phases
of the pattern are available and the cheaper of the two mismatch counts
wins; when n is odd, only the phase matching the majority value fits, and
that is exactly the phase whose mismatch count comes out even, so taking
the even member of the pair is never a choice.

The two budgets are independent — row swaps never disturb what the columns
must decide, and vice versa — so the minimum total is their sum, and the
bound is tight because a single swap moves at most one row and one column
toward their target seats. Every number the method needs comes from the
first row, the first column, and the one full pass for the invariant.

**Complexity:** `O(n²)` time, `O(n)` space.
