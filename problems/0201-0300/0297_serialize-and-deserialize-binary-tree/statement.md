# Serialize and Deserialize Binary Tree

## Description

Serialization is the process of converting a data structure into a sequence
of symbols so that it can be stored in a file or memory buffer, or sent over
a network link, and later reconstructed faithfully. Design an algorithm to
serialize and deserialize a binary tree.

Implement the `Codec` class:

- `String serialize(TreeNode root)` Encodes the tree `root` into a single
  string.
- `TreeNode deserialize(String data)` Decodes that string back into the same
  tree.

**There is no required string format.** The judge calls `serialize` on a
tree, feeds the exact string it returned straight into your own
`deserialize`, and checks that the tree that comes back is identical to the
original. Any encoding that round-trips — level order, preorder with null
markers, parenthesised, anything — is accepted; the serialized string itself
is never compared. The empty tree must survive the round trip too.

### Example 1

```text
Input:
["Codec", "serialize", "deserialize"]
[[], [[1, 2, 3, null, null, 4, 5]], [<the string serialize returned>]]
Output: [null, <any string>, [1, 2, 3, null, null, 4, 5]]
Explanation:
Codec codec = new Codec();
String data = codec.serialize(root);   // any encoding you like
codec.deserialize(data);               // must rebuild the same tree
```

### Example 2

```text
Input:
["Codec", "serialize", "deserialize"]
[[], [[]], [<the string serialize returned>]]
Output: [null, <any string>, []]
Explanation:
The empty tree must round-trip back to the empty tree.
```

### Constraints

- The number of nodes in the tree is in the range `[0, 10⁴]`.
- `-1000 <= Node.val <= 1000`.

### Follow-up

The reference solution encodes breadth-first. Could you design a
depth-first encoding (for instance preorder with explicit null markers) that
also rebuilds the tree uniquely, and would its strings be shorter or longer
on sparse trees?

## Hints

### Hint 1

A tree is uniquely recoverable only if the encoding says where every subtree
is absent. The level-order array does that with marker slots: reading left
to right and keeping a queue of nodes waiting for children turns the array
back into the tree — each marker fills a slot without adding to the queue.

### Hint 2

Split the work in two: parse the string into the marker array (a plain
token split with `null` translated to the marker), then rebuild the tree
from the array with the queue walk; and conversely, walk the tree in
level order to emit tokens, pushing real children but never the markers'
nonexistent ones.

### Hint 3

Emitting level order needs the same trailing trim both ways: null markers
for the children of the last nodes pile up at the end of the sequence, and
dropping trailing nulls (or markers) is what makes the canonical form
unique. Handle the empty tree up front — it is the one case with no first
token to read.
