# Solutions — Valid Palindrome II

Deleting at most one character leaves only two possibilities: the string is
already a palindrome, or exactly one deletion repairs it. A two-pointer walk
settles both, spending the deletion at the first mismatch it meets.

## Two pointers, one paid mismatch

Walk `lo` and `hi` inward from the two ends while `s[lo] == s[hi]`. If the
walk never fails, the string is a palindrome as it stands and the deletion
goes unused, so the answer is `true`.

The first failing pair is where the decision lives. A deletion anywhere
strictly inside that pair leaves both offending characters in place, so it
cannot help; the deletion must remove `s[lo]` or `s[hi]` themselves. That
gives exactly two candidates — the stretch `s[lo+1..hi]` and the stretch
`s[lo..hi-1]` — and the answer is whether either one is an exact palindrome,
checked with a plain second walk that allows no further deletions. Because
each candidate keeps one end of the broken pair attached to its half, the two
scans cover every way a single deletion could have been spent at the
mismatch; nothing beyond it needs reconsidering, since both scans verify
their remainder in full.

Each of the at most three walks traverses disjoint ranges of the string once,
touching only two indices and no copies of the data.

**Complexity:** `O(n)` time, `O(1)` space.
