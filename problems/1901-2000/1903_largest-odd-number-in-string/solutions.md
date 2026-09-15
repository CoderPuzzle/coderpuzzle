# Solutions — Largest Odd Number in String

An odd number is recognised purely by its last digit, and comparing two
numbers written without leading zeros needs only their lengths. Both facts
together collapse a quadratic substring search into a single scan.

## Cut at the rightmost odd digit

Any candidate is a substring of `num`, and the largest one must start at
index `0`: `num` has no leading zeros, so a longer digit string always
outvalues a shorter one, and every substring starting later is at most as
long as the prefix ending at the same place. Among the prefixes, a value
is odd exactly when it ends on an odd digit — parity is decided by the
final digit alone — so the answer is the prefix that ends at the rightmost
odd digit of `num`. Every other prefix is either shorter or even, and
every other substring is dominated by one of those.

Finding that cut is one backward scan for the first digit in
`{1, 3, 5, 7, 9}`, returning `num` up to and including it; if the scan
falls off the start, no odd substring exists and the answer is `""`. Only
characters are inspected — the up-to-`10⁵`-digit value is never converted
to a number, so no language ever touches its integer width limits.

**Complexity:** `O(n)` time, `O(1)` extra space.
