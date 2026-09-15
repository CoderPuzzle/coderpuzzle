# Solutions — Count The Repetitions

## Block walk with cycle detection

Consuming copies of `str2` from `str1` is greedy work: match each next needed
character of `s2` at its earliest position in `str1`, exactly as in a
subsequence check. Doing this one `s1`-block at a time, the only state that
crosses a block boundary is the cursor into `s2` plus the count of complete
copies consumed so far — and the cursor alone determines how every later
block plays out. So after each block, record the pair (blocks used, copies
consumed) against the cursor; the cursor has at most `|s2|` values, so within
`|s2| + 1` blocks some cursor repeats.

The repeat exposes a cycle: between the two sightings, `cycle_blocks` blocks
always added `cycle_copies` copies. Walking all `n1` blocks would cost
`|s1|` steps each — up to `10⁸` character comparisons at the ceilings — so
instead the huge remainder is jumped arithmetically: whole cycles are added
to `blocks` and `copies` in one `O(1)` step, and only the few leftover blocks
are finished by hand. If some character of `s2` never appears in `s1` the
cursor stalls immediately, the cycle adds zero copies, and the walk still
terminates with the correct zero.

The answer is `copies // n2`: `m` full units of `str2 = [s2, n2]` need
`m * n2` complete copies of `s2`, and the greedy walk extracts the maximum
available.

**Complexity:** `O(|s1| · |s2|)` time (state exploration, then `O(1)`
arithmetic), `O(|s2|)` space.
