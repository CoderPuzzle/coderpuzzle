# Solutions — All Possible Full Binary Trees

Every node carries the same value, so a tree here is nothing but a shape and
the answer is a pure shape enumeration whose count depends only on `n`. The
lever is the root: below it, a full tree of `n` nodes is a left shape of `l`
nodes joined to a right shape of `n - 1 - l` nodes, both full, with `l` odd —
and each choice of the pair yields a distinct tree while every full tree
arises from exactly one pair. The decomposition is self-similar, so it closes
into a recursion over sizes, and its traversal — left sizes ascending, left
shapes varying slowest — is precisely the order the statement pins.

## One memoized split per size

The recursion builds the list for each size once. A size of 1 is the single
leaf; an even size contributes nothing, since a full tree's node count is
odd by the parity of root-plus-pairs. For an odd size `n`, the loop walks
`l = 1, 3, …, n - 2`, pulls the already-built shape lists of `l` and
`n - 1 - l` from a memo, and for every left shape against every right shape
emits a fresh root joining the two — one list per size, each emitted tree
one root allocation that links its two subtrees.

Memoization is what keeps this a construction rather than an explosion: the
loop for size `n` asks for each smaller size many times (every split of 19
wants the shapes of 1, 3, 5, …), and the memo answers all but the first ask
for free. Completeness and distinctness come from the root split itself — a
full tree's root determines its unique `(l, left, right)` triple, so the
enumeration visits every tree exactly once, and two emitted trees differing
in either half differ as serializations. The recursion steps sizes down by
2, so it nests at most `n / 2 + 1` frames — 11 at the constraint's
`n = 20` — no strain on any of the seven runtimes' stacks.

**Complexity:** `O(C·n)` time, `O(C·n)` space, where `C` is the Catalan
number counting the trees in the answer (`4862` at `n = 19`) — the output
itself holds `C·n` nodes, so the construction is asymptotically optimal.
