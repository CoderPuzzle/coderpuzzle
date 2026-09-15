# Solutions — Minimum Number of Frogs Croaking

## Prefix counters over the five letters

Scan the string once and keep, for each of the five letters, how many
instances are currently "open" — seen but not yet consumed by a finished
croak. Every `'c'` opens a new croak; every later letter consumes one
instance of its predecessor, so on seeing `'r'`, `'o'`, `'a'` or `'k'`
the predecessor's open count must be decremented and the letter's own
count incremented. If the predecessor count is already zero, the string
cannot be an interleaving of croaks and the answer is `-1` immediately;
the same holds if any count is left open at the end.

The number of frogs needed is the number of croaks in progress at once:
each `'c'` raises it (a frog starts croaking) and each `'k'` lowers it
(that frog is done and free), so the answer is the maximum this running
value ever reaches. There is no scheduling subtlety — a finished frog is
free to start again later, and an unfinished one cannot help anyone else,
so the peak of in-progress croaks is both necessary and sufficient.

Five integer counters make the pass `O(1)` per character; a length of
`10⁵` is a single linear scan with no allocation beyond the counters.

**Complexity:** `O(n)` time, `O(1)` space.
