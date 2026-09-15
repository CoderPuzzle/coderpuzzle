# Solutions — Sum of Root To Leaf Binary Numbers

## Iterative depth-first with a running binary value

A root-to-leaf path is read as a binary number, so the walk carries one
running value per open path instead of a list of bits: the stack holds
`(node, running)` pairs, where `running` is the value formed by the bits
from the root down to but excluding `node`. Popping a node appends its
bit — `running * 2 + node.val` — which is exactly how a binary number
grows when one more bit is written after it. When a node with no children
comes off the stack its path is finished, so the completed value joins the
running total; the leaf is the only place a value is ever summed. An
internal node contributes nothing on its own — its bit only matters inside
the values of the leaves below it.

Unlike a fixed-depth digit problem, nothing in the statement caps how deep
a path can run before it must fit the promised 32-bit answer, so the
running value is carried in a 64-bit accumulator (`long` / `int64_t` /
`i64`, Python's arbitrary-precision `int` for free) rather than a 32-bit
one: it costs nothing on the cases that stay small, and it removes any
risk of intermediate overflow while a long prefix of zero bits is still
being walked before the value grows. The node count `[1, 1000]` also
guarantees a root, so the walk starts at the first bit with no empty-tree
case, and a single-node tree is simply a leaf whose value is its own bit,
zero included: the path `0` is the value `0`.

The traversal is iterative rather than recursive, in the same
`(node, state)` shape as the other tree walks here: a right-heavy or
left-heavy tree can run up to the full node count deep, and a native
recursive call per node would grow the call stack by just as much,
risking a stack overflow (or, in Python, `RecursionError` against the
default recursion limit) well before the node cap is reached. The
explicit stack instead holds pending frames on the heap, so depth costs
memory rather than call-stack frames. Each node is pushed exactly once, by
its parent, so every shape — chains, balanced trees, all-zero or all-one
values, repeated equal-valued paths — costs one visit per node.

**Complexity:** `O(n)` time — each node enters the stack exactly once,
with constant-width arithmetic per node — and `O(n)` space in the worst
case for the stack (a single-chain tree keeps every ancestor pending
until the leaf is reached), or `O(h)` for a balanced tree of height `h`.
