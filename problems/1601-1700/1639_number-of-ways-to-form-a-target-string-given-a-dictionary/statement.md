# Number of Ways to Form a Target String Given a Dictionary

## Description

You are given `words`, a list of strings that all share the same length,
and a string `target`. Treat `words` as a table: row `j` is `words[j]`
and column `k` is the `k`th character of every row.

Build `target` from left to right, one character per step, under these
rules:

- To place `target[i]` (0-indexed), choose a column index `k` and a row
  index `j` such that `words[j][k] == target[i]`.
- Using column `k` consumes it permanently: afterward, column `k` and
  every column to its left become unusable, in every row, for the rest
  of the process. Equivalently, the column indices used across the whole
  construction of `target` must be strictly increasing from step to
  step.
- Any two consecutive steps may draw their character from different
  rows, and the same row may supply characters at more than one column,
  as long as the column-consumption rule above is respected.

Two ways are different if they use a different column, a different row,
or both, at some step. Return the number of distinct ways to form
`target` from `words`. Since the answer can be large, return it modulo
`1e9 + 7`.

### Example 1

```text
Input: words = ["acca","bbbb","caca"], target = "aba"
Output: 6
Explanation: There are 6 ways to form target, each written as the
sequence of (column, row) choices for 'a', 'b', 'a':
column 0 ("acca"), column 1 ("bbbb"), column 3 ("caca")
column 0 ("acca"), column 2 ("bbbb"), column 3 ("caca")
column 0 ("acca"), column 1 ("bbbb"), column 3 ("acca")
column 0 ("acca"), column 2 ("bbbb"), column 3 ("acca")
column 1 ("caca"), column 2 ("bbbb"), column 3 ("acca")
column 1 ("caca"), column 2 ("bbbb"), column 3 ("caca")
```

### Example 2

```text
Input: words = ["abba","baab"], target = "bab"
Output: 4
Explanation: There are 4 ways to form target, each written as the
sequence of (column, row) choices for 'b', 'a', 'b':
column 0 ("baab"), column 1 ("baab"), column 2 ("abba")
column 0 ("baab"), column 1 ("baab"), column 3 ("baab")
column 0 ("baab"), column 2 ("baab"), column 3 ("baab")
column 1 ("abba"), column 2 ("baab"), column 3 ("baab")
```

### Constraints

- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 1000`
- All strings in `words` have the same length.
- `1 <= target.length <= 1000`
- `words[i]` and `target` contain only lowercase English letters.

## Hints

### Hint 1

For each column index, precompute how many rows have each letter at
that column — a 26-way frequency count per column.

### Hint 2

Use dynamic programming over (number of target characters placed so
far, number of columns considered so far), using the per-column
frequency counts to add ways whenever a column is used to place the
next target character.
