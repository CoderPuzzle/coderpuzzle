# Solutions — Construct Binary Tree from String

## Single scan with a stack of open ancestors

The parentheses spell a preorder walk: every integer opens a node, and every
parenthesized group is one whole subtree written immediately after the node
that owns it — the root's integer comes first, then its left subtree's
group, then its right's. Nothing appears twice and nothing arrives out of
order, so one left-to-right scan meets each node's pieces exactly when they
can be decided: the value first, then the finished left subtree, then the
finished right.

The stack holds the ancestors still open for children. Reading an integer
creates the node and pushes it, and the node on top is the only candidate
parent for whatever integer comes next — the first integer, with nothing
beneath it, is the root. Each `)` closes one group: the subtree just
finished pops and is handed to the node underneath, into the left slot if
that is still open, otherwise the right. That single slot test is the
problem's left-first rule in full, and it also marks what the grammar cannot
say: a right group is only legal after a left one, so a node holding a right
child but no left child has no representation at all, and the empty string
is simply the empty tree.

The parse is iterative in every language because the ceiling is deep, not
wide: `3 * 10⁴` characters of `1(1(1(…)))` cost three characters per level
and admit a chain 10000 nodes tall, and recursion that deep nests ten times
past CPython's default 1000-frame limit and over the 512k stacks the judge
hands Java and Node. The explicit stack stands in for the call stack and
never holds more than one entry per level of the current path, so the
deepest legal input parses without a single nested call. Values are read as
whole digit runs, a leading `-` included, so multi-digit and negative
numbers need no special handling anywhere.

**Complexity:** `O(n)` time — every character is consumed exactly once — and
`O(h)` space for the stack, where `h` is the tree's height: `O(log n)` for a
balanced tree, `O(n)` worst case for a chain up to 10000 deep.
