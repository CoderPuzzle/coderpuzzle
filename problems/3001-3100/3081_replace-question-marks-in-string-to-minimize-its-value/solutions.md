# Solutions — Replace Question Marks in String to Minimize Its Value

## Greedy least-frequent letter, sorted fill

The value decomposes per letter: if a letter appears `x` times, it contributes
`0 + 1 + ... + (x-1) = x(x-1)/2` no matter where those occurrences sit, so
only the final letter counts matter — position never enters the objective.
Raising a letter's count from `x` to `x+1` adds exactly `x` to the value, so
each `?` is best spent on the letter whose count is currently smallest, and an
exchange argument turns that myopic choice into a global optimum.

Ties between equal counts go to the smaller letter. That costs nothing — equal
counts contribute equally — and it picks the lexicographically smallest optimal
multiset. With the multiset fixed, the lexicographically smallest string puts
its letters in sorted order across the `?` slots from left to right, since any
inversion could be swapped into a smaller string of the same value. The port
scans the 26 counts for each `?` (`O(26n)`, comfortably within `n = 10⁵`),
collects the chosen letters, sorts them, and fills.

**Complexity:** `O(26n + n log n)` time, `O(n)` space.
