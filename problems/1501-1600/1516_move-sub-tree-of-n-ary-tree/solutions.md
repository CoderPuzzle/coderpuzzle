# Solutions — Move Sub-Tree of N-Ary Tree

The move itself is only a handful of pointer edits, and every method here
performs exactly those edits; the real work is learning the two facts that
decide which edits apply. Those facts are the parent p hangs from and
whether q sits inside p's subtree — the one case that can tear the tree
apart, since q travels with p's lifted subtree and must be re-hung into
the slot p vacates (the root slot itself when p is the root) before p can
take its place as q's last child. What the methods differ in is how the
facts are gathered: one materializes a parent registry up front and walks
p's subtree a second time to hunt for q, while the other fuses both
questions into the single traversal that already visits every node, and
so needs no registry at all.

## Parent map with a subtree probe

The first pass records every node's parent in a registry keyed by value —
lawful because the values are unique — leaving the root without an entry,
which is exactly the information "am I the root?" needs later. The second
pass is a plain depth-first probe out of p that stops the moment it
reaches q: if it does, q sits inside p's subtree and the reconnecting
case applies. The rewiring then runs on registry lookups alone. Free q
from its parent, hang q where p stood — writing q over p's slot in p's
parent's children list, or returning q as the new tree's root when the
registry has no entry for p — and append p as q's last child. When the
probe misses, the move is the plain re-attachment: free p and append it
to q. One guard runs first in every case: p already hanging directly
from q means the tree must not change at all, since even the
move-to-the-back rule is suspended for that pair.

The registry keeps the walk ignorant of what it is looking for — the
same table answers p's parent, q's parent, and the root check — at the
cost of an entry per node and a second walk that the fused method below
does not spend.

**Complexity:** `O(n)` time, `O(n)` space — each pass visits every node
at most once, and the registry holds one entry per node.

## One sweep with an inside-subtree depth

A single depth-first walk carries everything the surgery needs, so the
registry disappears. Each stack frame records the node, its parent, and a
depth that counts how many levels below p the walk currently is: it
starts at zero, rises by one for every step beneath p, and drops back to
zero everywhere else. Recording p's parent on arrival at p and q's parent
— plus the fact `depth > 0`, which certifies q sits inside p's subtree —
on arrival at q leaves the walk holding the complete fact set; anything
the counter never marked cannot be inside p's subtree, so a missed q is
cases 2 or 3. From there the rewiring is the same three edits: free q and
re-hang it into p's old slot when the counter fired, always append p as
q's last child, return q only when p was the root. The direct-child guard
runs first here too, and for the same reason — that one pair is the
exception the statement freezes in place.

Nothing is stored between frames and no node is revisited: the answer is
assembled as the traversal finishes, so the space bill is the explicit
stack alone — which also makes the walk indifferent to a 1000-deep chain,
the constraint's worst shape for a recursive framing.

**Complexity:** `O(n)` time, `O(n)` space — every node is pushed once,
and the stack holds at most one frame per node.
