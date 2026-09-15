# Solutions — Design Most Recently Used Queue

A fetch never grows or shrinks the line — it lifts the `kth` element out
and re-appends it at the end — so both solutions read the operation as the
same order-statistics question: which element is the `kth` right now?
The square-root decomposition answers physically, keeping the line in
blocks and paying a walk across them per fetch. The Fenwick tree answers
virtually: every element holds a stable position on a tape whose reading
order is the line's order, and a counted tree over the tape's tail plus a
virtual front over its long run locate the `kth` live position in
logarithmic hops.

## Square-Root Decomposition

The queue is cut into consecutive blocks of about `sqrt(n)` slots. A
fetch has two jobs — find the `kth` element, then move it to the very
end — and both stay local under the cut. Locating the target walks
whole blocks, subtracting each block's size from `k`, so the scan
touches one length per block instead of one slot per element; lifting
the value out shifts only the remainder of its own block.

The move to the end reuses that locality. The fetched value is appended
to the tail block while it still has room, and rolls into a fresh
single-slot block once the tail is full, so no element ever shifts
across blocks to make room. A block that runs empty is dropped on the
spot — every surviving block holds at least one element, and within the
statement's call budget at most one new block appears per full tail, so
the block count stays a small multiple of the initial `n / sqrt(n)` and
the next walk costs `O(sqrt(n))` again.

Construction fills the blocks with `1..n` in one pass, and the queue
never grows or shrinks — each fetch moves an existing element — so the
blocks carry exactly `n` values in linear space.

**Complexity:** `O(√n)` time per fetch, `O(n)` space.

## Fenwick Tree

Give every element a stable home on a virtual tape and never shift a
neighbour. Value `v` starts at tape position `v`, and the `j`-th fetch
re-appends its element at position `n + j`; appends always land to the
right of everything live, so tape order is line order forever, and
"remove the `kth` element" becomes "find and vacate the `kth` smallest
live position".

The tape pays attention only where elements actually move. The initial
run `[front..n]` holds nearly all positions but gains at most one hole
per fetch, so it stays virtual: `front` is the first live position, a
sorted hole list remembers the vacated slots, and the live count is
arithmetic — `n - front + 1` minus the holes. The append region is the
complement: at most `q ≤ 10⁴` positions ever exist there, one per fetch
timestamp, so a Fenwick (binary indexed) tree over the timestamps counts
live elements per position — a cell reads 1 while that stamp's element
is still live — and a timestamp-to-value map remembers what each stamp
carries.

Each fetch asks which region owns the `kth` slot. In the run, the answer
is the smallest `x` with `x - front + 1 - holes up to x >= k`: a binary
search whose every probe counts holes by a second binary search, after
which vacating `x` splices it into the hole list — bounded work while
the list stays inside the `q ≤ 10⁴` call budget — and `front` steps
across any holes the removal exposed at the head. In the append region,
a Fenwick descend — binary lifting from the top bit of the stamp budget,
absorbing whole subtrees while their counts fall short of the wanted
rank — lands on the smallest live stamp of that rank, reads the value
from the map, and clears the stamp. Either way the value is rewritten
onto the next stamp and switched on in the tree.

**Complexity:** `O(log n · log q)` time per fetch, `O(q)` space.
