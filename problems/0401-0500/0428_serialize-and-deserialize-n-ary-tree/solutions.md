# Solutions — Serialize and Deserialize N-ary Tree

## Level-order with null-separated children groups

`serialize` walks the tree with a queue, seeding the token list with the
root's value and the `null` that closes the root's children group. Each
node popped from the queue contributes its children's values in order —
the children join the queue as they are written — followed by one `null`
terminating that group. Because parents leave the queue in level order and
each writes its own group before any deeper node does, the tokens come out
as the level order display with every group explicitly closed: the tree
`[1,null,3,2,4,null,5,6]` yields `1,null,3,2,4,null,5,6,null,null,null,null`
before trimming, and a leaf-only root yields `1,null`.

The tail of the token list is nothing but group-closing `null`s for the
deepest nodes, so trailing markers are trimmed down to the last real value;
the pieces join under single commas inside `[`…`]`, and the empty tree is
the bare `[]`. The format is self-delimiting in the original problem's
sense — a decoder reading values until each `null` rebuilds every group —
but under this judge only the encoding itself is compared, byte for byte.

The queue holds each node exactly once and writes one token per node plus
one marker per group, all append-only; nothing depends on the tree's arity
or height, and the walk is iterative so a 1000-deep chain costs no stack.

**Complexity:** O(n) time, O(n) space, where n is the number of nodes.
