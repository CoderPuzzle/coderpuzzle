# Solutions — Accounts Merge

Both solutions read the input as one graph whose vertices are the addresses
and whose edges say "written down together" — each person is a connected
component of it, and the answer reports the components in first-sighting
order, each as one name followed by its addresses in ascending order. The
traversal builds the graph in the open, then walks each component with an
explicit stack. The disjoint-set structure never writes an edge down at all:
`find` and `union` fold the same connectivity into a forest of parent
pointers, trading an explicit walk for climbs that stay near-constant
amortized.

## DFS over the Email Co-Occurrence Graph

The addresses themselves are the vertices worth tracking, and an entry is a
statement of adjacency: everything it lists was written down together. The
code builds that graph explicitly, but not wastefully — each entry
contributes star edges, its first address joined to each of the others,
which spans the entry with a linear number of edges and lets chains through
shared addresses carry reachability exactly as pairwise edges would.

Components then fall out of a traversal rather than of bookkeeping.
Sweeping the entries in reading order, address by address, the first address
not yet visited opens its component: an explicit stack pops an address,
accounts it, and stacks every neighbor not already visited, until the
component is exhausted. The stack is a stack and not recursion because one
address can sit in very many entries and the chain can run as deep as the
input is long. Marking on push, not on pop, is what lets each address enter
its component exactly once, so the collected list needs no duplicate pass
before sorting.

The sweep itself supplies both output disciplines. Components take their
numbers at first sighting — which is the judge's slot rule verbatim, each
person slotting where their earliest address turned up — and the name needs
no separate map: the entry being swept holds the address that opened the
component, so that entry belongs to the person and its wording seeds the
name. Entries of one person agree on the name; where two disagree, the
judge's answers print the later record's wording, so each entry re-stamps
the name of every component it touches and the most recent one through the
sweep gets the last word.

Two different people who go by one name never meet in the graph, since
nothing but a shared address ever joins two vertices. Writing `A` for the
total number of addresses, the traversal touches each vertex and each edge
once, and the sorting of the components dominates the work.

**Complexity:** `O(A log A)` time, `O(A)` space.

## Union-Find over Emails

Treat every email address as a node in a union-find structure. For each account, every email is unioned with the account's first email, so all emails of one account — and, transitively, of any chain of accounts sharing emails — end up under a single root. `find` compresses paths by halving as it walks, keeping later lookups effectively constant-time.

A second pass over the accounts, in input order, groups emails by root: each email is looked up and added to its root's set, and the first time a root is seen it is appended to an order list. This preserves exactly the output ordering the judge requires — merged accounts appear in the order of the earliest-appearing email of each component. The name attached to each merged account is the owner recorded for the root email; every account in a component belongs to the same person, so any member's name works.

Each component's emails are sorted before being appended to the name, duplicate emails within one account are absorbed by the set, and same-named people whose emails never coincide stay in separate components, as the problem demands. With `A` the total number of emails, the union-find operations are near-linear and the per-component sorts dominate the running time.

**Complexity:** `O(A log A)` time, `O(A)` space.
