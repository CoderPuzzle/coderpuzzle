# Solutions — Lexicographically Smallest Palindromic Permutation Greater Than Target

## Forced half with one greedy bump

A palindromic permutation cannot rearrange freely. Parity decides existence:
every letter count must be even, except exactly one odd count that the middle
character absorbs on odd lengths. Once the middle is pinned, the multiset of
the first half is forced too — exactly `freq[d] / 2` of every letter — since
each copy not spent on a side has nowhere left to sit. And because both
compared strings share one length, two candidate palindromes are decided
inside the first half whenever their halves differ: order on full palindromes
equals order on (half, middle, mirrored half). The whole search collapses to
choosing the smallest workable arrangement of one forced half multiset.

Split target at the halfway mark and call its first half p. If p itself can
be assembled from the forced counts, the entire palindrome is pinned, and it
qualifies only when that pinned string already clears target past the shared
prefix — the mirrored tail beats target's tail (even lengths), or the pinned
middle letter is larger, or it ties and the mirrored tail still wins. A
qualifying pinned palindrome is unbeatable: any other candidate differs
inside the first half and is therefore larger.

Otherwise the half must be strictly greater than p, and a greedy finds the
smallest such arrangement. Walk p holding the unused counts, matching its
letters as long as possible — a longer shared prefix is always smaller — and
at each position remember the smallest still-available letter strictly
greater than `p[i]` together with a snapshot of the counts; the latest such
bump point wins. Whether the walk breaks early because some `p[i]` ran out,
or completes with the pinned palindrome rejected, fall back to that bump:
emit the matched prefix, the remembered larger letter, then every leftover
letter in ascending order, which is the smallest tail any fixed multiset
allows. Mirror the half behind the pinned middle and return. No bump anywhere
means every palindromic permutation sits at or below target, and the empty
string comes back.

**Complexity:** `O(n)` time, `O(n)` space.
