# Solutions — Maximum Strong Pair XOR II

Both sweeps stand on the same ground: sort `nums`, read the kindred
condition as `y <= 2 * x` for the smaller value `x`, and slide a
two-pointer window `[ceil(y / 2), y]` across the sorted order — it only
ever grows on its right edge and shrinks on its left. Inside the window
the question is always the same, the best XOR partner of the current
`y`, and both structures answer it greedily from the top bit down,
asking at each level whether some live value can still flip that bit.
The bit-prefix hash set is the flatter machine: one hash map keyed on
the window's bit prefixes, each key counting how many values carry it,
probed layer by layer as the window moves. The binary trie builds the
same prefixes as real nodes with live counts — more moving parts, but
the sharper, node-local walk.

## Sort, slide a window, and consult a bit-prefix hash set

The window is the same two-pointer sweep — sort, insert the current
`y`, retire the left end while `2 * x < y` — but the lookup structure
collapses into a single hash map keyed on bit prefixes. Every live
window value contributes all `20` of its prefixes, read from the top
bit down, and each key counts how many window values pass through it:
a value entering the window adds its `20` keys, a value leaving the
window decrements its `20` counts, and keys that fall to zero are
deleted so nothing outlives its element.

Prefixes of different lengths would otherwise collide on the same
integer — the one-bit prefix `0` and the seventeen-bit prefix `0` are
different creatures — so each key carries a leading `1` bit past its
value bits, pinning the length: `(1 << L) | (x >> (20 - L))` names
`x`'s top `L` bits unambiguously. A query walks `y` from the top bit
down holding the prefix it has committed to so far, and at each level
asks the map for that prefix extended by the complement of `y`'s next
bit. If the key is present, some live value really has those top bits,
so the result takes a `1` there and the walk commits to the complement;
otherwise it commits to `y`'s own bit — always available, because `y`
was just inserted and its own prefixes keep every level reachable.

Each value is inserted once, retired once, and queried once, each at
`20` prefix layers of expected constant-time map work, so the sweep
matches the trie's running time up to hashing constants. The map holds
at most `20` keys per window value, each below `2²¹` with its marking
bit, so 32-bit integers hold every key and count in every language.

**Complexity:** `O(n log C)` time — `C` the value bound, so 20 prefix
layers — and `O(n)` space for the map's keys.

## Sort, slide a window, and walk a binary trie

Brute force dies here: with up to `5 * 10⁴` values there can be ~`10⁹`
pairs. The first simplification is ordering. Sort `nums`; with `x <= y` the
strong-pair condition `y - x <= x` becomes `y <= 2 * x`, so every partner
of `y` lives in the sorted prefix `[ceil(y / 2), y]`. Sweeping `y` from
left to right, that window only ever gains elements on its right edge and
loses them on its left edge — a classic two-pointer sliding window.

Inside the window the task is the classic maximum-XOR-partner query, which
a binary trie over the values' 20 bits answers greedily: for a query `y`,
walk from the most significant bit down, at each level stepping into the
subtree with the opposite bit whenever it is non-empty, so the accumulated
XOR keeps its highest possible bits. Because the window slides, each node
also carries a count of how many live window values pass through it —
inserting a value increments the counts along one root-to-leaf path, and
when the left pointer advances, the departed value's path is decremented,
so "subtree non-empty" means genuinely present in the current window.

Each of the `n` values is inserted once, deleted once, and queried once,
each at `20` levels of trie, so the whole sweep is linear in `n` up to the
constant bit count. All values are below `2²⁰`, so the XOR of any pair is
below `2²⁰` and 32-bit integers hold every intermediate in every language.

**Complexity:** `O(n log C)` time — `C` the value bound, so 20 trie levels —
and `O(n)` space for the trie nodes.
