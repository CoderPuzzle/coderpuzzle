# Solutions — Maximum Palindromes After Operations

## Spend character pairs shortest-first

A swap may move any character to any position of any word, so the only thing
that matters is the global multiset of letters; every word keeps its length.
Counting letters yields `P` disjoint same-letter pairs. A palindrome of length
`L` spends `L / 2` such pairs on its mirrored slots plus one leftover center
character when `L` is odd, so making a chosen set of words palindromic costs
exactly the sum of their length-halves in pairs. Centers never run out: the
chosen words consume precisely their own characters, and once the mirrored
pairs are removed there are always at least as many leftover characters as
there are odd-length words among them.

The answer is therefore the largest number of words whose pair costs sum to at
most `P`. The exchange argument settles which words: replacing any chosen word
by an unchosen shorter one never raises the cost, so some optimal choice takes
the shortest words first. Sort the halves ascending and take words while the
budget lasts.

**Complexity:** `O(T + n log n)` time for `T` total characters, `O(n)` space.
