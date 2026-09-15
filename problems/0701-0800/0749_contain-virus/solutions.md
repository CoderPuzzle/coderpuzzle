# Solutions — Contain Virus

The statement leaves nothing to optimize: each day the region whose
frontier — the uninfected cells it would reach that night — is largest gets
walled in, and every other region infects its own frontier during the
night. The answer is just the running total of walls those daily
quarantines cost, so the whole problem is a faithful simulation of one day,
repeated until no region touches an uninfected cell.

## Label the regions, wall the widest frontier, let the rest spread

One day is three passes. First, label the infected regions: flood each
not-yet-visited block of 1s with an explicit stack (never recursion —
nothing bounds a region's depth) and, while walking it, collect its
frontier, the set of distinct 0-cells it touches, and its wall count — one
wall per shared boundary between a region cell and a 0-cell. That per-edge
rule is what Example 2 pins down: the ring around a single clean cell
spends four walls, and a clean cell pressed from two sides costs two.
Second, quarantine the region with the largest frontier: add its wall
count, then overwrite its cells with an inert mark so they never spread
again and never rejoin a region. Third comes the night: every remaining
region infects its frontier simultaneously.

The night is where the two easy mistakes live. A frontier cell shared by
several spreading regions is infected once, not once per region, and a
cell the quarantined region had threatened is still infectable by an active
region — its walls seal only the quarantined region's own edges, they do
not protect the cell against everyone. Regions also grow into each other's
path and merge, which is why the labeling restarts from the empty mark
every morning instead of being maintained incrementally.

The loop ends on its own: each day permanently retires one region, and a
night's growth can merge regions but never split one or create a new one,
so there are at most as many days as there are initial regions — and the
last day arrives when no frontier anywhere is nonempty, every region being
either behind walls or out of clean neighbors. With `R` the number of
days, each day does one sweep of the grid plus one walk per region cell.

**Complexity:** `O(R·m·n)` time, `O(m·n)` space.
