# Solutions — Shortest Distance to Target String in a Circular Array

## Circular Distance Scan

Walking one direction around the ring from `startIndex` to a match at
index `i` takes `d = |i − startIndex|` steps; walking the other way takes
exactly `n − d`. The two directions never interleave — any step sequence
that reaches `i` must be one of those straight walks, since a path that
reverses direction only repeats ground it already covered. So the distance
to `words[i]` is `min(d, n − d)`, and the answer is the minimum of that
quantity over every index holding `target`.

One linear scan collects it: compare each word against `target`, keep the
best `min(d, n − d)` seen so far. If no index matches at all — the loop
finishes with nothing recorded — the target is absent and the answer is
`−1`, matching the statement's contract.

**Complexity:** `O(n · L)` time for n words of length up to L (string
comparisons dominate), `O(1)` extra space.
