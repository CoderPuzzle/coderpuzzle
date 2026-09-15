# Solutions — Array of Objects to Matrix

## Iterative leaf harvest over a path worklist

Every element is flattened with one explicit LIFO pass: entries are
`[container, segments]` pairs, an object pushes its key/value children and
an array its index/value children, and only a scalar pops into a result —
its column name is simply the segments joined with `"."`. A stack matters
here because nesting depth is unbounded ("deeply nested"), while the
runner's stacks are deliberately small across languages; per-element maps
also keep each element's own leaves separate, which is exactly what row
assembly needs later.

Assembly is then mechanical: the header is the sorted union of every leaf
path seen anywhere (plain string sort — indices behave as their decimal
strings, so `'1' < '10' < '11' < '2'`), and each remaining row walks those
columns against its element's map. The only trap is missing-versus-present:
cells legitimately hold `false`, `0`, `""`, or `null`, all of which look
empty under truthiness tests, so membership must be checked explicitly and
only genuinely absent columns default to `""`.

**Complexity:** visiting each node once plus the segment copying at leaves
gives `O(S · D)` time where `S` is the total number of nodes across `arr`
and `D` the deepest path length; space is the output itself, `O(R · C)`
for `R` rows and `C` unique columns, plus `O(L · D)` for the stored path
strings while harvesting the `L` leaves.
