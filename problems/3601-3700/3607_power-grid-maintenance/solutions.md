# Solutions — Power Grid Maintenance

## Fixed components, advancing minimum pointer

Because a grid never changes — going offline leaves a station in place and
does not rewire any cable — the connected components of the initial graph
are all that matters. Union-Find assembles them once: every `connections`
edge merges two stations, and after the merge each root owns exactly one
component. Grouping the stations `1..c` by their final root and sorting
each group ascending gives, for every grid, the ordered list whose front
holds the smallest id. Nothing about the queries touches this structure
again.

Within a component, the check `[1, x]` needs the smallest _online_
station. A naive scan is too slow, but the online set only ever shrinks:
stations go offline and never return. So instead of a balanced tree per
component, keep one index per component that points at the smallest
online station, and advance it past freshly-offline fronts when needed.
`[2, x]` is then a constant-time mark plus, only when `x` was the current
minimum, a walk forward over the newly offline prefix. Across the whole
query stream each station is walked past at most once, which is what makes
the total query handling linear.

Two statement rules fall out of the same structure. An online station
resolves its own check even when a smaller station shares the grid — that
is just the `online[x]` fast path, checked before the pointer is consulted.
And when `x` is offline with an empty online set in its grid, the pointer
has walked off the end of the component, so the answer is `-1`. The pointer
encoding turns the "smallest id in the same grid" lookup into a single
indexed read.

**Complexity:** `O(c log c + n + q)` time, `O(c + n)` space.
