# Solutions — Earliest Time to Finish One Task

## Minimum finish sum

No task ever waits for another: the pair `[si, ti]` is finished at moment
`si + ti` no matter what the remaining pairs are doing. So the tasks never
interact, and "earliest time at which at least one task is finished" is
simply the smallest value of `si + ti` across the array. Nothing about the
ordering of the pairs matters — a task listed last can just as easily be the
first one done.

That reduces the problem to one linear scan. Keep a running minimum,
initialized from the first pair, and fold each remaining pair's finish sum
into it; no sorting by finish time or sweeping over moments of time is
needed. Ties need no special care either — two pairs sharing the same sum
produce the same answer, so it never matters which of them is seen first.

The values are small (`si + ti <= 200`), so 32-bit arithmetic is safe in
every language, and with at most 100 pairs even a sort-based pass would run
instantly; the running minimum simply avoids the extra pass.

**Complexity:** `O(n)` time, `O(1)` space.
