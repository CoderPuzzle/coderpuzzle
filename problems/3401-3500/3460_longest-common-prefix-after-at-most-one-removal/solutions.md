# Solutions — Longest Common Prefix After at Most One Removal

Deleting a character from `s` can only help at the exact spot where the
plain prefix walk dies; everywhere else it pure loss. That collapses the
"at most one removal" freedom into a single candidate position.

## Two pointers, one deletion at the first mismatch

First walk `i` forward while `s[i] == t[i]`, stopping at the first
mismatch or when either string runs out — this is the no-removal answer.
The only deletion that can ever beat it is `s[i]`: removing an earlier
character `s[p]` yields `p + LCP(s[p+1:], t[p:])`, and the matching stretch
`t[p..i-1]` it relies on is strictly shorter than what the first-mismatch
removal inherits, while a removal after `i` leaves the mismatch at `i`
unrepaired (both cases are dominated — the ladder in the generator checks
this exhaustively against a brute force over every removal). So the answer
is `i` plus the length of the common prefix of `s[i+1:]` and `t[i:]`.

When the first walk ends because a string ran out, the same formula
degenerates correctly: skipping past the end of `s` compares against an
empty tail, and skipping inside an exhausted `t` cannot grow the prefix
beyond `t`'s length.

**Complexity:** `O(n + m)` time — two linear scans — and `O(1)` extra
space.
