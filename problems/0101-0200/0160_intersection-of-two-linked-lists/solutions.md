# Solutions — Intersection of Two Linked Lists

Both walks read the answer off node identity rather than values: past the
join the two heads traverse the very same nodes, so the first node the
walks share by reference is the answer, and the unequal prefixes in
front of it must not be allowed to fake a meeting between equal-valued
look-alikes. The hash set asks the definition's own question directly —
record list A's nodes, walk list B, stop at the first node already
recorded — and pays for that directness with `O(m)` set storage. The
two-pointer walk equalizes the distances the two walks have left, so
they meet level at the join node while allocating nothing beyond the
walkers themselves; that pointer form closes the file as the reference.

## Hash set over list A

The direct reading of the definition. Record every node of list A in a
set keyed by the node's identity rather than its value — Example 1's two
1s are two different nodes that merely hold equal numbers, so the set
must key on the node itself to tell them apart. Walking list B then
stops at the first node already recorded: any node B can reach that
also belongs to A lies in the shared suffix, and the first such node is
by construction the join. A B-walk that falls off the end untouched
means no node of A ever entered B's path — the lists never meet.

Each language reaches that identity key by its own means — object
references in the managed runtimes, raw addresses in C++ and Go, `Rc`
pointers in Rust — but the contract is one membership test per node,
expected constant time, so every node is visited once and the whole
search stays `O(m + n)`.

The set is the bill: up to `m` stored references, `O(m)` extra space —
exactly the allocation the follow-up's couple-of-pointers bound forbids,
and the work the pointer walk below refuses to spend.

**Complexity:** `O(m + n)` time, `O(m)` space.

## Two pointers, equalized walks

The intersection is a fact about node identity, not values: both heads lead
into chains that eventually become the very same nodes, so the first node the
two walks share by reference is the answer. Because the prefixes before that
node can differ in length, two pointers started at the heads reach the
intersection unevenly — after the shorter prefix's pointer has already moved
onto the shared tail, the longer one is still in its own prefix.

The canonical fix is to equalize the distances left to walk. One form measures
both lengths first and advances the longer list's pointer by the difference, so
the two remaining walks have equal length; stepping both pointers together then
makes them collide exactly at the first shared node (or reach `null` together
when there is no intersection). The switchback form gets the same effect
without counting: when a pointer falls off its list it restarts at the other
list's head, so after at most one switch each pointer has covered
`own prefix + other prefix`, the same total distance, and they meet at the
intersection — or at `null` after both have traversed everything.

Both variants are pure pointer work: no allocation, no bookkeeping, and the
input structure is only read. Values are ignored entirely, which is what makes
the identity contract honest — equal values in the two prefixes must not fool
the walk. The judge serializes the shared tail from the returned node and
verifies the node is genuinely part of the aliased chain, so returning a node
from list B's own prefix fails loudly.

**Complexity:** `O(m + n)` time — each pointer traverses at most both lists —
and `O(1)` extra space.
