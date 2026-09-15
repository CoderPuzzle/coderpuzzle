# Solutions — Split Linked List in Parts

Splitting one chain into `k` pieces is fully determined by arithmetic: with
`n` nodes, every part gets `n / k` of them and the first `n % k` parts one
more, so no two sizes differ by more than one and no earlier part is smaller
than a later one. The only work is making the cuts land exactly on that
arithmetic — and doing it without allocating a single new node.

## One count pass, then k cuts

The algorithm takes two passes over the list. The first only counts: `n`
nodes are to spread over `k` parts, and `width = n / k` with `extra = n % k`
fix every part's size before any pointer moves. The second pass walks the
chain once, cutting at the computed boundaries: part `i` starts where part
`i - 1` ended, hops `size - 1` links forward to its last node, severs that
node's `next`, and hands the successor to part `i + 1` as its head.
Zero-size parts need no special case — they arise only when `width` is 0 and
every node has already been handed out, so the head they receive is already
null and the hop loop simply does not run; positive-size parts always find
their `size - 1` successors because the sizes sum to `n` exactly.

Because each part's start is the previous part's orphaned successor, the
parts are consecutive by construction and keep the input's node order —
nothing is copied, reordered, or rebuilt; the returned heads are the original
nodes themselves. Each node is visited once while counting and once while
cutting, so the walk is immune to input shape: a 1000-node chain behaves
exactly like a 3-node one, and no recursion appears anywhere. The Rust port
differs only in mechanics: its nodes are owned boxes, so a part's last node
hands its tail over with `take()` — the same cut expressed as a move instead
of a pointer write.

**Complexity:** `O(n)` time, `O(k)` space.
