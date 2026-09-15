# Serialize and Deserialize N-ary Tree

## Description

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that an N-ary tree can be serialized to a string and this string can be deserialized to the original tree structure.

For example, you may serialize a 3-ary tree as `[1 [3[5 6] 2 4]]`. Note that this is just an example, you do not necessarily need to follow this format.

![diagram](figures/428-1.svg)

Or you can follow LeetCode's level order traversal serialization format, where each group of children is separated by the null value. For example, a tree may be serialized as `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`.

![diagram](figures/428-2.svg)

You do not necessarily need to follow the above-suggested formats, there are many more different formats that work so please be creative and come up with different approaches yourself.

For a deterministic answer, `serialize` returns the string form of that level order serialization: the root's value, then `null`, then for each node in level order its children's values followed by a `null` that closes the group, trailing `null` markers trimmed. The string opens with `[` and closes with `]`, values appear in decimal, and the pieces are joined by single commas with no other characters — the tree `[1,null,3,2,4,null,5,6]` serializes as `"[1,null,3,2,4,null,5,6]"` and the empty tree as `"[]"`. The original problem accepts any self-consistent codec — only the round trip is checked — which exact judging cannot express, so this one format is pinned here as the deterministic-answer device: `serialize` must return precisely this encoding.

### Example 1

```text
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: "[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]"
```

### Example 2

```text
Input: root = [1,null,3,2,4,null,5,6]
Output: "[1,null,3,2,4,null,5,6]"
```

### Example 3

```text
Input: root = []
Output: "[]"
```

### Constraints

- The number of nodes in the tree is in the range `[0, 10⁴]`.
- `0 <= Node.val <= 10⁴`
- The height of the n-ary tree is less than or equal to 1000
- Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.
