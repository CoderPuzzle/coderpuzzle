# Solutions — Kill Process

## Parent map, breadth-first sweep

The parent array `ppid` describes the tree only upward — each process points at
its parent — but the killed set lives downward. One pass inverts it into a hash
map from parent to the list of its children, appended in `pid`-array order so
each family keeps the order its ids appear in the input. From there the task is
pure reachability: the processes that die are exactly the subtree rooted at
`kill`, and a breadth-first walk from `kill` enumerates it in the very order the
statement pins.

The walk needs no separate queue — the output list is the queue. It starts
holding just `kill`; a head index advances across it, and each process's
children are appended, in map order, when the head reaches it. Every process
thus enters the list in breadth-first discovery order: `kill` first, its
children next in the order their ids appear in `pid`, then theirs. When the head
runs off the end of the list the answer is already assembled.

Each process is appended exactly once and has its children consulted at most
once, so the whole run is linear. The map and the answer each hold at most `n`
entries — killing the root returns the entire tree, which makes the output
itself the largest structure the method builds, while killing a leaf returns
just the one id.

**Complexity:** `O(n)` time, `O(n)` space.
