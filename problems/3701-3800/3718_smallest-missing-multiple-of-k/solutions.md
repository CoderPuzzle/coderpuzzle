# Solutions — Smallest Missing Multiple of K

## Hash set over ascending multiples

The question is pure membership: the answer is the first candidate in the
sequence k, 2k, 3k, ... that nums does not contain. So one pass over nums
drops every value into a hash set, and an upward walk over the multiples
then asks the set one constant-time question per step — "is this candidate
present?" — until the answer turns negative. Stepping by k instead of by 1
means only true multiples are ever tested; no divisibility check is needed
anywhere.

Two properties pin the walk down. Each present candidate consumes at least
one array element, so the walk can never take more than n steps before it
finds a gap — duplicates collapse in the set without affecting this, since
a duplicate covers a candidate already counted. And k = 1 degenerates
cleanly: the candidates become every positive integer in turn, so the walk
returns the smallest positive integer absent from nums, exactly what the
definition demands of it.

The bounds keep the arithmetic tiny: at most 100 elements none larger than
100 can cover at most floor(100 / k) distinct multiples of k, so the first
missing candidate is at most (floor(100 / k) + 1) · k ≤ 100 + k ≤ 200,
comfortably inside 32-bit signed range.

**Complexity:** `O(n)` time, `O(n)` space.
