# Solutions — Longest Chunked Palindrome Decomposition

## Greedy Prefix/Suffix Peeling

Chunks come in mirrored pairs around the center, so decompose from the outside in: at each step find the shortest prefix of the remaining text that equals the suffix of the same length, peel both off as two chunks, and repeat on the narrower interior. Taking the shortest match first is safe by an exchange argument — if an optimal decomposition starts with a longer chunk pair, splitting its prefix at the point where the greedy match ends still leaves valid pairs, so the greedy choice never reduces the final count.

The implementation keeps two boundaries, `left` and `right`, on the original string (no slicing of the middle), and grows `size` from 1 while `left + size <= right - size` — a prefix can only pair with a suffix that fits without overlapping. Python slice comparison `text[left:left+size] == text[right-size:right]` decides each candidate. On a match, the count gains 2 and both boundaries move in by `size`; when no size matches, whatever remains (possibly a single odd middle block, or the last unpairable stretch) is taken as one final chunk and the loop stops.

Interior characters never need to re-examine outer ones, but the growing-size scan can retry long prefixes, so the worst case is quadratic — fine for texts up to length 1000. A string of one character, or any text whose ends cannot pair at all, immediately falls into the final-single-chunk branch and returns 1.

**Complexity:** `O(n^2)` time, `O(n)` space.
