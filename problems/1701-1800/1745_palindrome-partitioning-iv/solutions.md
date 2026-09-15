# Solutions — Palindrome Partitioning IV

## DP palindrome table, then scan the two cuts

A split into three non-empty parts is fixed by two cut positions: the
first part is `s[0 .. i-1]`, the second `s[i .. j-1]`, and the third
`s[j .. n-1]`. Once every "is this substring a palindrome?" question can
be answered in constant time, checking all `O(n²)` cut pairs decides the
problem directly.

The constant-time answers come from an interval DP table `isPal[l][r]`.
A length-one substring is always a palindrome, a length-two substring is
one when its two characters match, and every longer substring `s[l .. r]`
is a palindrome exactly when `s[l] == s[r]` and the inner substring
`s[l+1 .. r-1]` is. Building the table by increasing length makes each
entry depend only on an already-computed, strictly shorter one.

With the table filled, two nested loops over `i` and `j` — the first part
always non-empty (`i >= 1`) and the third always non-empty (`j <= n-1`) —
return `true` as soon as all three segments test as palindromes. The whole
scan is iterative, so a 2000-character string costs only the `O(n²)` table
build plus the `O(n²)` split scan, both well within the limits.

**Complexity:** `O(n²)` time, `O(n²)` space.
