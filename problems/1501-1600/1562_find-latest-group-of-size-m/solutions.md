# Solutions — Find Latest Group of Size M

## Group-Length Tracking

Simulating the string bit by bit and rescanning for runs of length `m`
after every flip costs `O(n)` per step. The flips only ever grow groups by
merging at most two neighbors around the newly set bit, so each step's
effect on the group structure can be computed in constant time instead.

Keep a `length` array where, for any position that currently sits at the
left or right end of a `1`-group, the array holds that group's length
(interior positions are never read again once a group grows past them, so
their stale values don't matter). When position `pos` is flipped on, read
`left = length[pos - 1]` and `right = length[pos + 1]` — the lengths of
any run touching `pos` from each side (`0` if that neighbor is still `0`
or off the string). The new merged group has length `left + right + 1`,
and only its two new endpoints, `pos - left` and `pos + right`, need that
value written back. Alongside this, maintain `count[len]`, the number of
groups currently of length `len`: decrement `count[left]` and
`count[right]` (when positive) for the groups that just got absorbed, and
increment `count[left + right + 1]` for the merged group. Whenever
`count[m]` is positive right after a step, that step is a candidate
answer, so the last such step overwrites the running result. Because every
flip touches only a constant amount of state, the whole simulation runs in
one linear pass over `arr`.

**Complexity:** `O(n)` time, `O(n)` space.
