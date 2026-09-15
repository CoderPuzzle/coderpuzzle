# Solutions — Number of Adjacent Elements With the Same Color

## Neighbor-pair delta bookkeeping

Recounting all `n - 1` adjacent pairs after every repaint gives a correct but quadratic answer. The observation that makes it linear is local: painting cell `index` can only change the status of the two pairs it belongs to, `(index - 1, index)` and `(index, index + 1)`. Everything else in `colors` is untouched, so the global count simply shifts by however those two pairs flip.

The code keeps one running total and, per query, scores the painted cell's neighbor pairs twice: once against the outgoing color (subtracting matches found there) and once against the incoming color (adding new matches). A subtle correctness point is the meaning of 0: cells start uncolored and constraints forbid `colori = 0`, so zero always means "no color yet" and a pair contributes only when both members are non-zero and equal — otherwise the untouched tail of the array would inflate early answers.

Each query does constant work around two neighbor reads, so the whole sweep is one pass over `queries` after an `O(n)` initialization of `colors`. The running total never goes negative because removals are scored strictly before the write that could orphan them.

**Complexity:** `O(n + q)` time for `q` queries, `O(n)` space.
