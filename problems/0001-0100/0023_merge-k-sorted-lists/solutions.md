# Solutions — Merge k Sorted Lists

The cost of this problem is decided by how many times a node gets looked at,
and both solutions pay a `log k` factor once per node rather than a factor of
`k`. They differ in who does the choosing. The tournament merges whole chains
two at a time, halving the field each round, so a node is revisited once per
round it survives. The heap keeps all `k` current heads in one pool and asks,
per output node, "which head is smallest now?" — the chains are never merged
with each other; they are simply drained through the same funnel.

## Pairwise tournament merging

Merge the lists two at a time in rounds: pair up adjacent lists, merge each pair with the standard two-pointer dummy-head merge, and collect the survivors. When the count is odd the last list gets a bye and passes to the next round untouched. Each round halves the number of lists, so after `⌈log₂ k⌉` rounds a single merged list remains. This beats folding the lists in one at a time: a round walks every surviving node exactly once, giving `N log k` total node visits (for `N` nodes overall), whereas sequential merging can re-walk the same long list `k` times.

![Round 1 merges [1,4,5] with [1,3,4] into [1,1,3,4,4,5] while [2,6] gets a bye; round 2 produces [1,1,2,3,4,4,5,6].](figures/solution-tournament-rounds.svg)

The pairwise merge itself is the two-list algorithm: link the smaller current head to the tail, advance that list, and splice the leftover tail when the other runs dry — nodes are relinked in place, never copied. Before any merging, the code drops every `None` entry, so `[]` and `[[]]` both collapse to an empty list of candidates and return `None` immediately.

With `N` nodes in total, every surviving node is walked once per round across `⌈log₂ k⌉` rounds; the shrinking array of list heads peaks at `⌈k/2⌉` references in the first round, while the relinking of nodes themselves is in place.

**Complexity:** `O(N log k)` time, `O(k)` space.

## Min Heap

Every chain is already sorted, so at any moment the next node of the output
is the smallest of the `k` current heads — no other node can precede it.
A min-heap answers exactly that question per step, which removes the notion
of rounds and pairwise splicing entirely: the code seeds the heap with each
non-null head, then repeatedly pops the smallest, attaches it to the tail
being built, and pushes that node's successor as its list's new entry. One
list, one entry — the heap never holds more than one node per chain, which
is why it stays at size `k` and never at `N`.

Entries are keyed by `(value, input position)`. The position is doing two
jobs: equal values pop in input order, keeping the output stable with
respect to the array (the same rule the pairwise splice's `<=` enforces),
and — since several ports cannot compare nodes at all — it gives every
entry a total order on its own. A sentinel head absorbs the first
attachment; when the heap empties every chain has run dry, and the last
attached node already ends the output because its successor was taken on
the way in.

Null heads are simply never seeded, so an empty array and an array of
nothing but nulls both leave the heap empty and return the sentinel's null
successor. Each of the `N` nodes is pushed once and popped once, each heap
operation costing `O(log k)`, and the only extra storage is the heap
itself. (The Rust port detaches each node's tail before relinking, so the
remainder of its chain can be handed back to the heap as an owned entry —
the funnel is the same.)

**Complexity:** `O(N log k)` time, `O(k)` space.
