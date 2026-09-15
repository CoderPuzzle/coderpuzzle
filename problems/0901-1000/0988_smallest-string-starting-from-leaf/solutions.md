# Solutions — Smallest String Starting From Leaf

## One explicit-stack sweep over the leaves

Every root-to-leaf path, read backwards, is one candidate string, and the
answer is the smallest of them. The sweep walks the tree once, carrying a
single shared path buffer — one character per active frame on the traversal
stack, root to current node. Descending into a child appends its letter;
unwinding from a subtree pops it; so a frame never holds a copy of its
parent's path, and copying happens only where it is unavoidable: at a leaf,
the buffer is reversed into a candidate and compared against the best so
far. Nothing about the walk is recursive — it runs on an explicit stack of
node entries interleaved with unwind markers, because the constraints allow
a chain 8500 nodes deep, past CPython's default recursion limit and past
the small stacks the judge hands the managed runtimes; the explicit stack
is one entry per node or marker and never nests a call.

The comparison is where the problem's one trap lives, and it needs no
custom code. The statement's order is plain lexicographic order with the
addition that a strict prefix counts as smaller — Example 3's `"abc"` beats
`"abcc"`. That is exactly what every language's native string comparison
already computes: Python's `<`, Java's `compareTo`, C++'s `std::string <`,
Go's `bytes.Compare` (for these ASCII letters, byte order is letter order),
Rust's byte-vector ordering, and JavaScript's `<` on strings all walk the
two strings side by side, stop at the first differing character, and — when
one string runs out first — call the shorter one smaller. So the candidate
loop is a single native comparison per leaf, and the prefix rule falls out
of the comparator rather than being re-implemented where it could go wrong.

Each node is entered and left exactly once, so the walk itself is linear;
the only super-linear work is forming one candidate per leaf, as long as
that leaf's own path. A chain pays `n` once; a bushy tree pays `n log n`;
the worst shape — a spine with a leaf hanging off every node — pays the
sum of all leaf depths.

**Complexity:** `O(n · d)` worst-case time (each of the leaves forms one
candidate of its own length; `d` is the tree's depth), `O(n)` space.
