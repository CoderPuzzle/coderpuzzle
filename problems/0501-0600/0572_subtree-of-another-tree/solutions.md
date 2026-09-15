# Solutions — Subtree of Another Tree

## Anchor the equality test at every node

A subtree of `root` hangs from one of its nodes and takes every descendant
below it, so the question splits in two: an equality test that settles
whether two trees agree in value and shape, and a walk over `root` that
tries that test anchored at each node in turn. The test settles one aligned
node pair at a time — two missing children match, exactly one missing is a
shape difference no value can repair, and when both exist their values must
agree while both child pairs queue for the same treatment. A mismatched
anchor fails at its first disagreement, so a wrong anchor usually costs one
root-to-leaf path rather than all of `subRoot`, and the answer is true the
moment any anchor accepts.

The worst case is honest but narrow: `subRoot` can disagree with an anchor
only by walking out to its own frontier, so an all-equal adversarial pair —
a 2000-node chain against a 1000-node chain sharing its values — forces
about |root| · |subRoot| pair comparisons, while distinct values prune
almost immediately. Two alternatives push below that ceiling when many
anchors repeat shapes: hashing every subtree bottom-up (a Merkle
fingerprint) turns each equality test into one comparison of precomputed
hashes, and serializing both trees preorder with explicit null markers
turns the whole question into a substring search — the tags'
string-matching reading. Neither beats the plain two-loop form on clarity
at this problem's size.

Both walks carry explicit stacks rather than the call stack: a skewed
2000-node `root` would recurse 2000 frames deep — past CPython's default
limit of 1000 — and a 1000-node `subRoot` chain would sit exactly at that
edge, so every runtime iterates instead.

**Complexity:** `O(|root| · |subRoot|)` time in the worst case — an
adversarial anchor may inspect all of `subRoot` before disagreeing — and
`O(|root| + |subRoot|)` space for the two explicit stacks.
