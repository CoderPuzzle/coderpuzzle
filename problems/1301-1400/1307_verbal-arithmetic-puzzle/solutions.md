# Verbal Arithmetic Puzzle

## Approach: Column-wise backtracking with carries

The equation is processed one column at a time, right to left, exactly as
a person adds numbers by hand. At column `k` the letters appearing there
take a running sum; the sum's lowest digit must match the result letter
of that column and the rest becomes the carry into column `k + 1`.
Assignments are made letter by letter — whenever a letter lacks a digit,
an unused one is tried (zero forbidden for letters that lead a word) —
and the column check prunes the branch immediately, long before all
letters are bound.

Two structural prunes keep the search tiny. If the result is longer
than every word, the top result column is checked against the carry
alone; and if the result is not long enough to hold the widest column
of the words, the equation is rejected up front. Because at most ten
distinct letters exist and every column check either fixes or rules out
a digit, the explored tree stays far below the raw `10!` assignment
space.

**Complexity:** O(k · d!) worst case time with d ≤ 10 distinct letters
(pruned heavily in practice), O(d) extra space beyond the word storage.
