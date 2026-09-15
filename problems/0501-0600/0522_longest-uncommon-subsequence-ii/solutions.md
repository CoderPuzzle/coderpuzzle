# Solutions — Longest Uncommon Subsequence II

## Pairwise containment check

A string's only hope of being the answer is itself: if some other string
contains it as a subsequence, then every subsequence it could offer is a
subsequence of that other string too, so nothing drawn from it can be
uncommon. Conversely, when no other string contains `s`, the string `s`
itself is a subsequence of exactly one input string and is therefore
uncommon. Equal strings contain each other, so a duplicate pair disqualifies
both of its members — that is all the second example needs to return `-1`.

The observation reduces the problem to checking every string against every
other. For each candidate, a two-pointer scan decides containment: walk the
other string once and advance within the candidate whenever the next
character matches. The answer is the longest string no other string
contains, or `-1` when every string is contained in some other.

**Complexity:** `O(n^2 · L)` time, `O(1)` extra space.
