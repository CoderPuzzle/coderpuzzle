# Solutions — Make String Anti-palindrome

## Sort, then push the right half off its mirrors

Any sequence of swaps permutes `s` freely, so the task reduces to finding
the lexicographically smallest anti-palindrome among all rearrangements of
its letters — or reporting that none exists. Lexicographic order is decided
left to right, and the smallest `n/2`-letter prefix any rearrangement can
offer is the first half of the sorted multiset, so the left half is settled
by sorting. The mirror condition `s[i] != s[n-1-i]` never binds inside
that sorted left half against itself; it only binds where the right half
meets it, so all repair work happens in positions `n/2` to `n-1`.

Walking the right half left to right, a position is illegal only when it
copies its already-fixed mirror. The lex-smallest legal fill keeps the
current letter whenever it differs from the mirror and, on a collision,
borrows the next larger letter still sitting further right — the cheapest
upgrade available, since everything between is the same colliding letter.
A single pointer that only ever moves right finds that letter, because
each collision consumes one copy of it permanently; the pointer's position
never needs to step back. If the pointer runs off the end, no larger letter
remains: some letter fills more than half the string, and by pigeonhole
every arrangement pairs two of its copies, so `"-1"` is genuinely the
answer. At most one pointer advance and one swap happen per position.

**Complexity:** `O(n log n)` time, `O(n)` space.
