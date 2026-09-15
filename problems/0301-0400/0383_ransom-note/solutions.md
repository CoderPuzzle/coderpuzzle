# Solutions — Ransom Note

## Count the magazine, spend the note

The magazine is nothing but a budget of letters, and the note a list of
demands. Whether the note can be written depends only on how many of each
letter each side holds — the order of the letters in either string is
irrelevant — so the whole question collapses to comparing 26 counts. One pass
over the magazine tallies them: a fixed array with one slot per letter of the
alphabet, incremented for every character read.

A second pass spends the note against that budget, decrementing the slot of
each letter it needs. The single failure condition is a count dipping below
zero: that letter has been demanded more times than the magazine supplies it,
and since each magazine letter is usable only once, no rearrangement can fix
the shortfall. The check runs immediately after every decrement, so the
answer `false` surfaces on the first shortage rather than after the whole
pass; if every slot stays non-negative to the end, the answer is `true`.

A note longer than the magazine needs no special case — by pigeonhole some
letter must be over-demanded, and the counts catch it the same way.

**Complexity:** `O(n + m)` time, `O(1)` space — 26 counters.
