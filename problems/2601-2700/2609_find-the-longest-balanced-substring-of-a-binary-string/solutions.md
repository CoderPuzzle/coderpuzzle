# Solutions — Find the Longest Balanced Substring of a Binary String

## One pass with block counters

Every balanced substring is a zero-block followed immediately by a one-block,
using equally many of each — so it always has the shape `0…01…1` and its best
length is governed by the shorter side. That observation makes the whole
string answerable in a single left-to-right sweep: remember how long the most
recent zero-block is, and separately how many ones stand consecutively at the
current position.

Each fresh one encountered grows the one-tail and offers the candidate
`2 * min(zeros, ones)` — pairing whatever remains of the finished zero-block
in front of this tail. When a zero arrives, the old zero-block can no longer
help (any balanced use of it must sit strictly before the interrupting
character), so it restarts at length 1 whenever the previous character was
a one, extends by 1 when zeroes are still consecutive, and clears the
one-tail. The empty substring rule means initializing the best to 0 is
already correct. Values stay tiny (`n ≤ 50`), so plain machine ints suffice.

**Complexity:** `O(n)` time, `O(1)` space.
