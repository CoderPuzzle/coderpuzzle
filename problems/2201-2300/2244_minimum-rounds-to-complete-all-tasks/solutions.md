# Solutions — Minimum Rounds to Complete All Tasks

## Count levels, then divide into 3-rounds

Because every round must handle tasks of one difficulty level, the levels are
independent: the answer is the sum over difficulty levels of the minimum
number of rounds that level requires. A frequency count (hash map, or a sort
followed by run-length counting) reduces the problem to one integer per
level — how many rounds it takes to exhaust `c` copies using groups of `2`
or `3`.

For a single level with `c` tasks, a group of `3` is always the best use of a
round, so the answer is `ceil(c / 3)`, with one exception: `c = 1` can never
be partitioned into 2s and 3s, so a singleton level makes the whole input
impossible. The identity `ceil(c / 3) = (c + 2) / 3` holds for every `c`, and
the formula is constructive: when `c` is `0` or `2` mod 3 the remaining `1` or
`2` tasks take one extra 2-round, and when `c` is `1` mod 3 (and `c >= 4`) two
2-rounds replace one 3-round, which keeps the count at `(c + 2) / 3`.

The code accumulates this per-level count and returns `-1` the moment any
level has a single task. The example `[2,2,3,3,2,4,4,4,4,4]` has levels with
counts `3`, `2`, and `5`, contributing `1 + 1 + 2 = 4` rounds, while
`[2,3,3]` contains a level with one task, so it reports `-1`.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the number of tasks.
