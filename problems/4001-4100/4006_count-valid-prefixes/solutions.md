# Solutions — Count Valid Prefixes

## Running balance scan

Rearranging a prefix only shuffles its characters, so whether it can form an
alternating string depends on nothing but how many `'0'`s and `'1'`s it holds.
Those counts must differ by at most one: in an alternating string equal
characters can never sit side by side, so between any two `'0'`s there has to
be a `'1'`, and vice versa. The condition is also sufficient — when the counts
differ by at most one the arrangement can be written down directly by
alternating the two characters, starting (and ending) with the majority symbol
if there is one — so it is an exact test of rearrangeability, not merely a
necessary one.

The algorithm is a single left-to-right scan that keeps both running counts.
After consuming each character it checks whether `|zeros - ones| <= 1`; every
prefix passing that check contributes one to the answer, and nothing else
about the prefix matters. Extending a prefix updates the two counters in
constant time, so no prefix ever needs a separate recount and the whole string
settles in one pass.

The edge behavior falls straight out of the test. A length-one prefix always
passes, since one character against zero differs by exactly one. Runs of
identical characters are where prefixes fail: `"0000"` admits only `"0"`
itself, because `"00"` already carries two more zeros than ones. A perfectly
alternating input never lets the gap exceed one, so every prefix counts.

**Complexity:** `O(n)` time, `O(1)` space.
