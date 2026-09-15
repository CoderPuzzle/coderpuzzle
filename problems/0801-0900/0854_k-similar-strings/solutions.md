# Solutions — K-Similar Strings

## BFS fixing the leftmost mismatch

Each swap is a move between strings, so the minimum number of swaps is a shortest path and BFS from `s1` gives it. The branching factor is kept small by a normalization rule: from any string, locate the leftmost position `i` where it differs from `s2`, and only consider swaps that bring the required character `s2[i]` into that position. Every optimal solution must fix position `i` at some point, and doing it first never wastes a move, so this restriction preserves at least one shortest path while pruning the vast majority of swaps.

The inner loop scans `j > i` for candidates satisfying two conditions: `s[j] == s2[i]` (the swap installs the needed letter) and `s[j] != s2[j]` (the swap does not break an already-matching position). The second condition is the more subtle one — swapping a correctly-placed letter out would immediately create a new mismatch at `j`, and such a move is never part of a minimal solution. Each accepted swap produces a neighbor string built by slicing; novel strings join the queue with `steps + 1`.

Positions where the strings already agree are never touched, so the search really wanders only among rearrangements of the mismatched positions' letters. The dequeued string equal to `s2` is at the front of the queue at its optimal depth, which BFS guarantees is the minimum `k`. The trailing `return -1` is unreachable because anagrams are always convertible.

**Complexity:** `O(S · L^2)` time, `O(S · L)` space, for `L = len(s)` and `S` reachable states (rearrangements of the mismatched letters).
