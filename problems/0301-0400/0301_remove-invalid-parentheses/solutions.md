# Solutions — Remove Invalid Parentheses

## Level-by-Level BFS over Removals

The solution treats the input as the root of a search tree: from any string, the children are all strings obtained by deleting exactly one parenthesis (letters are always kept). A breadth-first traversal visits strings in order of how many characters were removed, so the first level that contains any valid string contains exactly the answers for the minimum number of removals — BFS guarantees minimality without computing the removal count up front.

Each level is stored as a set, which prunes the branching explosion: different deletions often produce the same shorter string (deleting either of two identical adjacent parentheses, for example), and deduplication keeps each level to the distinct strings only. For each level the code checks every member with a linear validity scan — a counter that increments on `(`, decrements on `)`, fails on going negative, and requires the counter to end at zero. If any member is valid, the valid members are sorted for deterministic output and returned; otherwise the whole level is expanded by one more deletion.

The traversal terminates because in the worst case every parenthesis is deleted and the empty string is trivially valid, so some level always contains a valid string. Letters never need deleting: an invalid string's problem is only imbalance among parentheses. For `")("` the first level has no valid string, the second level reaches `""`, and `[""]` is returned; for an input that is already valid, the answer comes from level zero with zero removals.

With `s` of length at most 25 and at most 20 parentheses, the distinct-string sets stay small in practice, though the worst case is inherently exponential in the number of parentheses — every subset of removals may need to be considered before the minimum is confirmed.

**Complexity:** `O(n · 2ⁿ)` time, `O(n · 2ⁿ)` space.
