# Solutions — Recover a Tree From Preorder Traversal

## Single scan with a stack of open ancestors

The string spells a preorder walk where each value is prefixed by a run of
dashes counting its depth. One left-to-right scan splits it into
`(depth, value)` pairs: a run of `-` gives the depth, and the digit run that
follows it — always positive per the constraints, so never itself
prefixed with `-` — gives the value.

A stack tracks the ancestors still open on the current root-to-here path,
one entry per depth: the entry at index `d` is the node last seen at depth
`d`. Reading a pair whose depth is `d` first trims the stack down to length
`d`, discarding everything deeper than this node's parent — that parent is
now on top. The new node attaches under it as the left child if the parent
has none yet, otherwise as the right (the statement guarantees a lone child
is always left, so this test alone decides the slot), and the node is then
pushed as the new top, ready to be someone's parent in turn. After the last
pair the stack's bottom entry is the root.

![Reading "1-2--3--4-5--6--7", the ancestor stack trims down to each dash depth before the node pushes on, so 3 and 4 attach under 2 and 5, 6, 7 complete the tree [1,2,5,3,4,6,7].](figures/solution-stack-trim-depths.svg)

**Complexity:** `O(n)` time, where `n` is the length of `traversal` — every
character is scanned once and each node is pushed and popped from the stack
at most once — and `O(n)` space for the stack and the reconstructed tree.
