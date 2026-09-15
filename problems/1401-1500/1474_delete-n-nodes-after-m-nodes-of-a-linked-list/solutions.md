# Solutions — Delete N Nodes After M Nodes of a Linked List

Both solutions walk the list once and apply the same rhythm — keep `m`,
drop `n`, repeat — and both handle the tail the same way: a keep run that
runs out of list early simply ends the walk, and a drop run that would
overshoot the tail drops only the nodes that are there. What separates
them is what becomes of the survivors. One collects their values and
threads a brand-new list from them, trading an array's worth of memory
for link work that is always an append. The other never allocates a node:
it stands on the last kept node of each cycle and rewires that node's
`next` past the dropped run in a single splice.

## Rebuild From Kept Values

The survivors are exactly the nodes the keep runs touch, so sweep one just
reads: walk the list with the two run lengths as counters, appending every
value a keep run holds and stepping silently through every drop run. Both
inner loops carry the same guard — stop when the walk falls off the tail —
which is what makes a short final keep run and a short final drop run fall
out without special cases; once the walk reaches the end mid-cycle, every
later step is skipped and the sweep is done.

Sweep two rebuilds: a placeholder head absorbs the awkward first append,
and each surviving value gets a fresh node hung off the growing tail. The
placeholder's `next` is the answer. The price is the buffer — every
survivor's value is held in an array until the second sweep has copied it
into a node, so the peak memory grows with the list even though the input
is never modified.

**Complexity:** `O(sz)` time, `O(sz)` space.

## In-Place Counter Walk

The observation that removes the buffer: after a keep run of `m` nodes,
the only link that has to change belongs to the run's last node — and
after the drop run, that same link should point at the next cycle's first
survivor. So a single cursor does all the work. A dummy node in front of
the head gives the first cycle the same shape as the rest: the cursor
begins each iteration on a kept node's predecessor, advances up to `m`
times onto the kept run, and ends standing on the run's last node.

The drop is then one measurement and one splice. A skipper pointer travels
up to `n` steps from the cursor — stopping early if the tail arrives
first — and the statement `node.next = skipper.next` discards the whole
dropped run at once and reattaches the survivor. (The Rust port detours
through ownership: a second cursor cannot borrow alongside the walking
one, so it strips the dropped run one `take()` at a time — the same nodes,
the same single sweep.) The cursor is already on the next cycle's
predecessor, so the outer loop simply repeats while there is anything left
to keep. Every node is visited a constant number of times, no node is
allocated, and the only extra state is the cursor, the skipper, and the
placeholder — all of it constant.

**Complexity:** `O(sz)` time, `O(1)` space.
