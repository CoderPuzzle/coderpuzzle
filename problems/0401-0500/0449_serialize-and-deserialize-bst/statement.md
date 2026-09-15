# Serialize and Deserialize BST

## Description

Serialization is converting a data structure or object into a sequence of bits
so that it can be stored in a file or memory buffer, or transmitted across a
network connection link to be reconstructed later in the same or another
computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There
is no restriction on how your serialization/deserialization algorithm should
work. You need to ensure that a binary search tree can be serialized to a
string, and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.

Implement the `Codec` class:

- `String serialize(TreeNode root)` Encodes a tree to a single string.
- `TreeNode deserialize(String data)` Decodes your encoded data to tree.

For a deterministic answer, serialize the tree as its preorder walk with
explicit null markers: each node contributes its decimal value, each absent
child contributes the letter `x`, and the pieces are joined by single commas
with no other characters — `[2,1,3]` is `"2,1,x,x,3,x,x"` and the empty tree
is `"x"`. The original problem accepts any self-consistent codec — only the
round trip is checked — which exact judging cannot express, so this one format
is pinned here as the deterministic-answer device. Both methods are judged
against it exactly: `serialize` must return precisely this encoding, and
`deserialize` always receives a string already in it.

### Example 1

```text
Input:
["Codec", "serialize", "deserialize"]
[[], [[2,1,3]], ["2,1,x,x,3,x,x"]]
Output: [null, "2,1,x,x,3,x,x", [2,1,3]]
```

### Example 2

```text
Input:
["Codec", "serialize", "deserialize"]
[[], [[]], ["x"]]
Output: [null, "x", []]
```

### Constraints

- The number of nodes in the tree is in the range `[0, 10⁴]`.
- `0 <= Node.val <= 10⁴`
- The input tree is guaranteed to be a binary search tree.
