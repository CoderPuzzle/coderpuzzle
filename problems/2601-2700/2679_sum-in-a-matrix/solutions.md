# Solutions — Sum in a Matrix

## Sort each row, sum the column maxima

An operation takes the largest remaining number from every row and scores the
largest of those, so the only thing that matters about a row is the sequence
in which it gives up its numbers, from biggest to smallest. Sorting each row
in decreasing order makes that sequence explicit: after sorting, column k
holds exactly the number that row surrenders during operation k+1. The score
of one operation is therefore the maximum over the rows that still have a
k-th number, and the answer is the sum of those maxima.

Because rows may have different lengths, the sweep runs to the widest row and
skips rows that are already empty — a row shorter than the current column
index has nothing left to remove, exactly as the "until the matrix becomes
empty" rule demands. The code sorts every row in place once, then takes one
maximum per column across at most 300 rows.

**Complexity:** `O(m * n log n)` time, `O(1)` extra space.
