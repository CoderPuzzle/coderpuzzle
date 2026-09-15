# Solutions — Groups of Strings

## Union-Find over Letter-Set Bitmasks

Since no letter repeats within a word, each word is a 26-bit mask of its letters, and the three connection operations become mask arithmetic: add or delete a letter toggles one bit, and replace removes one set bit while setting one absent bit. Two words are connected exactly when their masks differ by one of these moves, so the groups are the connected components of a graph whose nodes are masks — the answer is the component count and the largest component size.

Duplicate words would blow up the graph, so the solution first counts masks with a Counter and creates one union-find node per distinct mask, initialized with that mask's multiplicity so duplicates are merged into their component for free (a "replace a letter with itself" connection). For each mask it then unions against every neighbor present in the set: the 26 single-bit toggles, plus every combination of removing one present bit and adding one absent bit (iterated with low-bit extraction over the set bits and over the absent bits). Union by root with size accumulation tracks component sizes; path halving in `find` keeps queries nearly constant in practice.

After all unions, the number of distinct roots is the group count and the maximum size held at any root is the largest group. Each distinct mask does at most 26 + 26·26 ≈ 676 neighbor probes, each an O(1) hash lookup plus a near-constant union, so the pass is linear in the number of words up to the constant 26² factor.

**Complexity:** `O(26² · n · α(n))` time, `O(n)` space.
