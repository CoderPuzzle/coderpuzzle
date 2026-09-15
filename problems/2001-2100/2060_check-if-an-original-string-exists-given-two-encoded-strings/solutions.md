# Solutions — Check if an Original String Exists Given Two Encoded Strings

## Memoized index and wildcard balance

Memoize states `(i, j, diff)`, where `diff` is the unmatched wildcard length
produced by `s1` minus that produced by `s2`. At a digit, try every one-, two-,
or three-digit prefix remaining in its consecutive run and add its value to
`diff` for `s1` or subtract it for `s2`; stopping at each prefix represents
every possible partition. When `diff > 0`, a literal from `s2` consumes one
unit, and when `diff < 0`, a literal from `s1` consumes one. At balance zero,
two literals can advance only if they match. Acceptance requires both strings
to end with balance zero.

Memoization prevents different digit partitions from repeatedly exploring the
same suffix and balance. The recursion follows encoded characters rather than
expanding wildcard runs, so its depth remains small under the length-40 bound;
digit values only alter the state balance.

**Complexity:** `O(S)` time and `O(S)` space, where `S` is the number of reachable `(i, j, diff)` states in the bounded polynomial state graph.
