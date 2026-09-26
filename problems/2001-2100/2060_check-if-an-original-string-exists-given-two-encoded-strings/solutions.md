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

![Walking s1 = l123e against s2 = 44 over the shared original leetcode, the balance starts at 0, drops to −4 on s2's first 4, recovers as s1's l consumes one unit and digits 1, 2, 3 from the run 123 push it to +3, falls to −1 on s2's second 4, and e consumes the last unit, so both strings end at (5, 2) with diff 0 and the answer is true.](figures/solution-wildcard-balance-walk.svg)

Memoization prevents different digit partitions from repeatedly exploring the
same suffix and balance. The recursion follows encoded characters rather than
expanding wildcard runs, so its depth remains small under the length-40 bound;
digit values only alter the state balance.

**Complexity:** `O(S)` time and `O(S)` space, where `S` is the number of reachable `(i, j, diff)` states in the bounded polynomial state graph.
