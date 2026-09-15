# Solutions — Optimal Partition of String

## Greedy: extend each substring until a letter repeats

Scan the string left to right, building the current substring and
remembering which letters it already contains. When the next letter is
already present in the current substring, close that substring (count it)
and start a fresh one containing only the new letter; otherwise absorb the
letter into the current one. After the loop, the substring still open
counts too. Each of the 26 possible letters needs only one bit per
substring, so a single integer bitmask over `'a'..'z'` tracks the current
substring's letters — set bit `c - 'a'` on absorption, reset everything on
a restart.

Extending every substring as far as possible is optimal by an exchange
argument: consider any partition and the greedy's first cut position.
Greedy cuts no earlier than any other partition does (its first substring
contains at least the other's first substring), so induction on the
remaining suffix applies — a longer prefix leaves a shorter suffix, and a
partition of a suffix extends to a partition of any shorter one. Hence the
greedy's count never exceeds the minimum, while it is itself a valid
partition, so its count equals the minimum.

**Complexity:** `O(n)` time, `O(1)` space.
