# Solutions — Strange Printer II

## Bounding rectangles and a dependency graph

For each color, find its bounding rectangle in `targetGrid`: the smallest
axis-aligned rectangle spanning every cell that holds that color (its
min/max row and min/max col). If that color were ever stamped, the stamp
had to cover at least this rectangle, since a stamp is a solid rectangle
and every cell of it takes on the stamped color at that moment. So a color
`c` can only be a _valid_ stamp if every cell inside `c`'s bounding
rectangle ends up, in the final grid, either still showing `c` or showing
some other color that could only have arrived by being stamped again later,
on top of `c`.

That "stamped later, on top of" relationship is exactly a dependency: for
every cell inside color `c`'s bounding rectangle that shows a different
color `d` in the target grid, `c` must be stamped before `d`. Recording one
directed edge `c -> d` for every such pair (skipping self-edges) builds a
graph over the colors present in the grid. A stamping order that produces
`targetGrid` exists precisely when this graph has a valid topological order
— equivalently, when it contains no cycle: run a cycle check (DFS with a
"visiting/done" coloring, or Kahn's algorithm removing zero-in-degree
nodes) over the up-to-60 distinct colors, treating parallel edges between
the same pair as one. Any topological order the graph admits corresponds to
a legal stamp sequence (paint the colors in that order over their bounding
rectangles), because each color is stamped before every color the target
grid shows on top of it, and stamped after nothing that would need to see
through it. The grid is printable exactly when no cycle is found.

**Complexity:** `O(m·n + k²)` time, where `k <= 60` is the number of
distinct colors — `O(m·n)` to compute each color's bounding rectangle and
scan those rectangles for dependency edges, plus `O(k²)` for the cycle
check over at most `k²` edges. `O(k²)` space for the dependency graph.
