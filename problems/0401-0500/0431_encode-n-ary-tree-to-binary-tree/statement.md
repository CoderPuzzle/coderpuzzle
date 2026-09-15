# Encode N-ary Tree to Binary Tree

## Description

Design an algorithm to encode an N-ary tree into a binary tree and decode the binary tree to get the original N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. Similarly, a binary tree is a rooted tree in which each node has no more than 2 children. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that an N-ary tree can be encoded to a binary tree and this binary tree can be decoded to the original N-nary tree structure.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See following example).

For example, you may encode the following 3-ary tree to a binary tree in this way:

![diagram](figures/431-1.svg)

```text
Input: root = [1,null,3,2,4,null,5,6]
```

Note that the above is just an example which might or might not work. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

For a deterministic answer, `encode` uses the first-child / next-sibling mapping: each node's first child becomes its left child, and each child's next sibling (in the children list) becomes its right child — so a children group turns into a right-going chain hanging off the parent's left. `[1,null,3,2,4,null,5,6]` encodes as `[1,3,null,5,2,null,6,null,4]`: node 1's first child 3 is its left child, 3's siblings 2 and 4 chain to the right, and 3's own children 5 and 6 form the next chain. The original problem accepts any encoding whose round trip restores the tree — which exact judging cannot express — so this one mapping is pinned here as the deterministic-answer device: `encode` must return exactly this binary tree, judged by its level order serialization.

### Example 1

```text
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,null,5,2,null,6,null,4]
```

### Example 2

```text
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,null,null,3,6,4,null,7,8,5,11,null,12,null,9,null,14,null,null,null,13,10]
```

### Example 3

```text
Input: root = []
Output: []
```

### Constraints

- The number of nodes in the tree is in the range `[0, 10⁴]`.
- `0 <= Node.val <= 10⁴`
- The height of the n-ary tree is less than or equal to 1000
- Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.
