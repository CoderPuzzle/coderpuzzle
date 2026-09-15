# Solutions — Lexicographically Minimum String After Removing Stars

## Greedy stack of indices per letter

The operations always consume the leftmost `'*'` first, so one left-to-right
pass reproduces the whole process: keep 26 stacks holding the positions where
each letter still survives, and when a `'*'` arrives delete its own position
plus the newest position in the stack of the smallest letter that has a live
copy. Ties between equal copies are settled by taking the rightmost one —
removing a later copy keeps every earlier character in place and only ever
shortens the suffix by a smaller-or-equal letter, so no other legal choice
can end lexicographically smaller.

Marking deleted positions instead of splicing makes each step `O(26)` worst
case (the scan for the next non-empty letter slot) and `O(1)` amortized per
letter pushed once and popped at most once; a final filter pass collects the
survivors in original order.

**Complexity:** `O(n · 26)` time, `O(n)` space.
