# Solutions — Find Maximum Balanced XOR Subarray Length

## Paired-prefix state map

Two prefixes pin a window down from both ends at once. Let `pxor[i]` be the
XOR of `nums[0..i]` and `gap[i]` the parity gap — even elements seen so far
minus odd ones. For a window `(l, r]` (the elements strictly after index
`l`, up to and including `r`), the window's XOR is `pxor[l] XOR pxor[r]`,
which is zero exactly when the two prefix values match; its even/odd counts
are `gap[r] - gap[l]`, which tie exactly when those match too. So the window
is balanced if and only if the _pair_ `(pxor, gap)` holds the same value at
both ends, and the longest balanced window ending at `r` starts just after
the earliest earlier index carrying the same pair.

One sweep then settles everything. A hash map records the first index where
each pair occurs; the virtual start `(-1)` enters as pair `(0, 0)` so that
windows beginning at index 0 are handled by the same rule. At each position
the running pair is updated with the new element — XOR-ing the value in,
stepping the gap by +1 for an even element and −1 for an odd one — and if
the pair has been seen before, `i - first_seen` competes for the answer;
otherwise the current index becomes that pair's recorded origin. Keeping only
the _first_ occurrence per pair is what maximizes every length the pair can
ever report.

The values themselves never constrain the arithmetic: each element fits in
32 bits and stays below 2³⁰, so XORs stay in range everywhere, and the gap
merely walks between −n and +n. The map holds at most n + 1 pairs, and the
whole problem collapses to this single pass — no data structure beyond the
map, no second scan.

**Complexity:** `O(n)` time, `O(n)` space.
