# Solutions — Make Three Strings Equal

The only available operation cuts a string from the right, so whatever
the three strings finally become, each one ends up as a prefix of its
original self. That single observation pins down both the target and the
cost.

## Longest common prefix arithmetic

The final shared string must be a prefix of all three inputs, and the
statement forbids emptying a string, so it must be a **non-empty**
common prefix. Conversely any non-empty common prefix is reachable by
deleting the overshoot of each string, and since every deletion removes
exactly one character that must go anyway, the cheapest target is the
_longest_ common prefix: scan the three strings in lockstep while their
current characters agree, capping the scan at the shortest length.

If the first characters already disagree, no non-empty common prefix
exists and the answer is -1. Otherwise each string contributes exactly
its length minus the common-prefix length `L`, and the answer is
`len(s1) + len(s2) + len(s3) - 3·L`. Lengths are
at most 100, so the total is at most 297 — trivially inside 32-bit (and
JavaScript `Number`) range, with no accumulation anywhere.

**Complexity:** `O(n)` time (`n` = longest input length), `O(1)` space.
