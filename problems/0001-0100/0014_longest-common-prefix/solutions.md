# Solutions — Longest Common Prefix

## Vertical scan

A prefix shared by every string can never be longer than the shortest of them, which suggests reading the strings as columns rather than end to end. Column 0 of every string, then column 1, and so on: the common prefix is exactly the run of columns that agree everywhere, so the scan only has to continue until the first column where some string shows a different character or no character at all.

The method takes the first string as the column labels and, for each column, re-checks every other string. `column == len(s)` means a shorter string has ended; `s[column] != ch` is an outright disagreement. Either fault returns `first[:column]`, because every earlier column agreed and nothing after a fault can matter. When no column ever faults, the first string itself is the prefix, which is why a lone string or a set of identical strings falls straight through to returning it whole.

**Complexity:** `O(S)` time where `S` is the total number of characters, `O(1)` extra space.
