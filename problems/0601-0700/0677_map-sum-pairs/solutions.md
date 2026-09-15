# Solutions — Map Sum Pairs

Two ways to keep a map that answers prefix sums, and the difference is
where the prefix question gets paid. The hash scan pays at query time: it
stores each pair and does nothing else, so every `sum` walks all the
stored keys and adds the values of those that start with the prefix. The
trie pays at insert time: each `insert` folds the key's change in value into
running totals along its path, and `sum` only reads the number
sitting on the node the prefix names. Overwrites keep both honest — the map
corrects a re-insertion for free, because a key owns a single slot, while
the trie remembers the old value and walks the difference in.

## Hash Scan

The plain reading of the spec, kept literal: the design asks for a map from
keys to values that can also sum a prefix, so the variant builds exactly a
map and nothing more. `insert` is one assignment — `values[key] = val` — and
that is the whole maintenance story. The overwrite rule costs nothing here:
a key owns a single slot, so re-inserting replaces the old value in place,
and no correction has to be engineered the way the trie engineers it with
its side map of previous values.

`sum` is where the bill arrives. With no totals kept, the query
rebuilds the answer from the raw pairs: it walks every stored key, keeps
the ones that start with the prefix, and adds up their values. A prefix no
key begins with is discovered the same way as any other — the scan simply
finishes with nothing collected — and the total stays 0.

The trade is deliberate. Storage collapses to one entry per live key — no
nodes, no per-character structures, no deltas to keep honest — and `insert`
is constant time. The price is that every query re-reads the whole key
set, so `sum` grows with the number of stored keys rather than with
the prefix alone. Fine at this statement's scale of at most 50 calls; the
trie is the design that scales past it.

**Complexity:** `O(1)` expected time per `insert` and `O(N * p)` per
`sum`, with `N` stored keys and a prefix of length `p`; `O(C)` space,
where `C` is the total length of the distinct keys inserted.

## Trie of Running Prefix Sums

`insert` walks the key's characters down a prefix trie, creating nodes where
the path does not yet exist, and adds the key's **change** in value to every
node it touches — not the value itself. A side map from key to value remembers
what each key currently holds, so re-inserting an existing key walks its old
path with the new-minus-old delta: an overwrite corrects the running totals
instead of depositing a second copy. The number on any node is therefore
always exactly the sum of the current values of all live keys whose paths
pass through it.

`sum` walks the prefix through the same trie and returns the total on the node
it lands on. That node sits on the path of a key exactly when the key starts
with the prefix, so its running total is by construction the wanted sum — no
scan of the map, no visiting of the keys below. When the walk asks for a
letter no inserted key ever used, it falls off the trie, and that is itself
the answer: no key starts with that prefix, so `sum` returns 0 immediately.

Both operations walk characters one at a time and touch nothing else: an
insert pays for the key's own length, a sum for the prefix's, and each trie
node holds one map of children plus one integer. Nodes are never removed —
overwrites reuse the paths they already created — so the structure is one node
per distinct prefix among the keys ever inserted.

**Complexity:** `O(k)` time per `insert` and `O(p)` per `sum`, for arguments
of length `k` and `p`; `O(C)` space, where `C` is the total length of the
distinct keys inserted.
