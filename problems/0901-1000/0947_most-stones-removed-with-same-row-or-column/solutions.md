# Solutions — Most Stones Removed with Same Row or Column

Both routes answer one question — into how many row-and-column-connected
components do the stones fall — and differ only in how they find it. The
depth-first walk makes the links explicit: bucket the stone indices by row
and by column, then search out from each stone not yet reached, swallowing
a whole shared line at a time. Union-find keeps no buckets and no walk,
merging each stone on arrival into the class its row and its column already
hold, so one sweep and one pass over the roots settle the count with the
smaller constants.

## Depth-first search over components

Two stones are linked when they share a row or a column, and the linked
components are exactly what the moves see. Inside a component of `k`
stones, `k - 1` removals are always available — always take a stone that
still has a neighbor on the board, and only the component's last stone runs
out of company — while no move ever reaches across from one component to
another. The answer is therefore `n` minus the number of components, and
counting them is the whole task.

The search finds them directly. One pass buckets the stone indices by row
and by column, so every stone sits in exactly one row bucket and one column
bucket and the two maps together hold `2n` entries. A stack-driven
depth-first walk then starts at each stone not yet reached, counts one new
component for it, and expands every stone it pops through that stone's row
bucket and column bucket, marking and pushing whatever it finds unvisited.

Popping a bucket as it is expanded is what keeps the walk linear: a row of
`m` stones is scanned once, when the first of its stones comes off the
stack, and never again — left in place, that crowded line would be
rescanned by each of its `m` members in turn and the walk would degrade to
`O(n²)`. Every stone is pushed once and every bucket is scanned once; the
buckets and the visited flags are the only storage.

**Complexity:** `O(n)` time, `O(n)` space.

## Union-find over rows and columns

Call two stones connected when a chain of shared rows and columns joins
them; connectivity partitions the plane into components, and a stone in one
component never shares a line with a stone in another. Within a component
of `k` stones, `k - 1` removals are always achievable — order the chain so
each removed stone still neighbors a survivor, leaving one stone per
component — and a `k`th removal never is, since the last stone of the plane
shares its row and column with nothing. The most removable stones is
therefore `n` minus the number of components, and the counting, not the
order, is the whole task.

An iterative union-find with path halving and union-by-size computes the
components without ever materializing the `O(n²)` adjacency: two hash maps
remember the first stone seen in each row and in each column, and stone `i`
unions with the stone those maps already hold for its row `xi` and its
column `yi`. Every stone of a row ends up merged transitively, likewise
every stone of a column, so the classes are exactly the components. A final
pass counts the indices that are their own root and returns `n` minus that
count.

Each of the `n` stones does two expected-`O(1)` map operations and at most
two finds, and the parent and size arrays hold one entry per stone.

**Complexity:** `O(n α(n))` time, `O(n)` space.
