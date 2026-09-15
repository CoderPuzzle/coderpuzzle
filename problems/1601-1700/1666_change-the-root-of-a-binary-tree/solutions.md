# Solutions — Change the Root of a Binary Tree

Rerooting is a walk, not a rebuild: the rule names, for every node on the
leaf-to-root path, exactly which pointers move, so the whole answer is one
upward pass re-hanging the path as it goes. The single solution below
locates the leaf by value, recovers each node's parent in one traversal,
and applies the two steps exactly as written until the walk stands on the
old root — the leaf it started from is the new root.

## One walk up the path

On this judge's wire the tree arrives as `root` and the leaf as its
integer value — the original hands over node references whose nodes carry
`parent` pointers — so the pass opens with one descent over the tree
recording, keyed by value, the node that is each node's parent: the
parent pointers the statement's note demands, kept in the solver's own
map. Values are unique, so a value keys its node unambiguously and the
first node met with the leaf's value is the leaf itself.

The rule is then applied bottom-up, starting at the leaf and stopping
before the root. For the current node `cur`, its parent's downward
pointer to `cur` is cleared first — this is what keeps the later steps
free of conflict, since the slot the moved subtree needs is thereby
emptied. Then, if `cur` still has a left child — which happens exactly
when the path below came down `cur`'s right side, or not at all at the
leaf — that child moves across to become `cur`'s right child; when the
path below came down the left side instead, it is the left pointer that
was cleared, nothing moves across, and any off-path right subtree simply
stays put. Finally the parent is attached as `cur`'s left child and the
walk steps up to it. The original root is never processed: it only loses
its pointer to its path child and hangs, with whatever else it kept, as a
child of that path child.

The descent visits each node once and the walk re-hangs each path node
once, and both the parent map and the explicit traversal stack keep even
a 100-node chain entirely off the call stack.

**Complexity:** `O(n)` time, `O(n)` space.
