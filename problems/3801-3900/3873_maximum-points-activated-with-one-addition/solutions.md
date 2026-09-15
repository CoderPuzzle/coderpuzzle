# Solutions — Maximum Points Activated with One Addition

## Union-find over shared coordinates

The activation rule makes two points equivalent when they can be chained
through shared coordinates, so the closure of any activated point is exactly
its connected component: build a disjoint-set union over the points and,
for every x-coordinate and every y-coordinate, union the first point seen on
that line with every later point on it. Two hash maps from a coordinate
value to a representative point index do this in one pass. The size of a
component is the number of points in it.

A newly added point `(x0, y0)` is connected to the component holding the
points on column `x0` and to the component holding the points on row `y0`;
a single point can touch at most those two distinct components, so it
activates `size(A) + size(B) + 1` points (or `size(A) + 1` when `A` and `B`
coincide, and `size(A) + 1` when only one of the two lines exists).
Any two distinct components can always be joined by some integer point —
pick an x from one component and a y from the other; the cell `(x, y)` is
empty, otherwise that point would have glued the two components together
already.

So the optimum either joins the two largest components, or adds `n + 1`
when all points already form a single component. After one pass of
union-find the component sizes are tallied and the two largest are kept;
the answer is their sum plus one, or `n + 1` for the single-component case.
All coordinates fit in 32-bit integers and every intermediate value stays
below `2n + 1`, so no wider arithmetic is needed.

**Complexity:** `O(n α(n))` time, `O(n)` space.
