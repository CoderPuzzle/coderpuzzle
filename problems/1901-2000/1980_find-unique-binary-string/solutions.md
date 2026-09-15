# Solutions — Find Unique Binary String

## Cantor's diagonalization

There are `2^n` binary strings of length `n` but only `n` strings in the
input, so at least `2^n - n >= 1` strings are absent; the task is to exhibit
one of them without enumerating the whole space. Cantor's diagonal argument
does exactly that: for the `i`-th position, write the complement of the `i`-th
character of the `i`-th input string. The resulting string has length `n` and
differs from every input string — it differs from `nums[i]` at position `i`
because that position is the flipped bit — so it cannot appear in `nums`.

No hash set, sorting, or backtracking is needed. Each input string is touched
at exactly one character, so the whole computation reads `n` characters and
writes `n` characters, with only the output buffer for working space. The
approach is deterministic and always succeeds; the only requirement is that
`nums[i][i]` is a valid index, which the constraints guarantee because every
string has length `n`.

**Complexity:** `O(n)` time, `O(n)` space for the output string.
