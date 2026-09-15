# Solutions — Groups of Special-Equivalent Strings

The two allowed moves never mix parities: an even-indexed letter only ever
trades places with another even-indexed letter, and likewise for odd. A word
therefore reaches exactly the arrangements that keep the same letters on the
same parities, so two words fall into one group precisely when each parity
half of one is an anagram of the matching half of the other — Example 2's six
permutations of "abc" collapse into three classes this way, split by which
letter sits at the odd middle index.

## Sorted halves as a signature

Give each word a comparable signature: the letters at its even indices,
sorted, joined with a "#" to the letters at its odd indices, sorted. The
separator is safe because words are lowercase letters only, so the two halves
cannot bleed into each other. Dropping signatures into a hash set and taking
its size counts the groups exactly.

Sorting is legitimate because the reachability cuts both ways. Within one
parity, adjacent swaps generate every permutation of those positions, so the
letters living on the even slots travel as a multiset, and the same holds for
the odd slots; two words with equal sorted halves can therefore be moved onto
each other, while words whose halves differ in any letter count never can —
not even "zzxy" and "zzyx", which share their whole letter inventory but
split it across parities differently, which is why Example 1 counts them
apart. Example 1 then reads: "abcd", "cdab", and "cbad" all carry the
signature "ac#bd", "xyzz" and "zzxy" carry "xz#yz", and "zzyx" alone carries
"yz#xz" — three signatures in the set, so the answer is 3.

At most 1000 words of at most 20 letters keep every signature at 21
characters or fewer, a corpus of a few kilobytes at most, so the set fills
and answers well inside the limits.

**Complexity:** `O(N·L log L)` time, `O(N·L)` space.
