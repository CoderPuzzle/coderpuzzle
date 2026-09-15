# Solutions — Equal Row and Column Pairs

## Hash every row, then look each column up in the row multiset

A row and a column form a valid pair exactly when both read as the same
sequence of n values, so the matrix only has to be sliced two ways and the
matching sequences counted. Build a hash map from row sequence to how many
rows carry it — duplicate rows collapse into one entry that carries a
count.
Then read out each of the n columns in top-to-bottom order and add the
multiplicity its sequence has among the rows. A column matching k distinct
rows contributes k pairs at once, which is why Example 2's column 2, equal
to rows 2 and 3, adds 2 to the answer while column 0's match with row 0
adds 1.

Every pair is counted exactly once this way: pair (ri, cj) is attributed
to column cj's lookup, whose count includes ri precisely when the two
sequences are element-for-element equal. Nothing about the values needs to
be numeric — any hashable sequence works — so no arithmetic on cells is
involved and the value bound (cells up to 10⁵) never threatens overflow:
the running total itself is at most n² = 40 000.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
