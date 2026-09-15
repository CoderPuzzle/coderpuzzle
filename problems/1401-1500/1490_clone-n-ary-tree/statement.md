# Clone N-ary Tree

## Description

Given a root of an n-ary tree, return a deep copy (clone) of the tree.

Each node in the n-ary tree contains a value (int) and a list (List[Node])
of its children.

```text
class Node {
    public int val;
    public List<Node> children;
}
```

Nary-Tree input serialization is represented in their level order traversal,
each group of children is separated by the null value (See examples).

The judge serializes the returned tree in the same level-order form and
compares it against the input by value, so every node of the clone must
carry the original's value and the original's children, in the same order.

### Example 1

![diagram](figures/1490-1.svg)

```text
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]
Explanation: The returned tree is a fresh set of nodes holding the same
values and the same parent-child structure as the input.
```

### Example 2

![diagram](figures/1490-2.svg)

```text
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
```

### Constraints

- The total number of nodes is in the range `[0, 10⁴]`.
- The depth of the n-ary tree is less than or equal to 1000.
- Each node's value fits in a 32-bit signed integer.

### Follow up

Can your solution work for the graph problem?

## Hints

### Hint 1

Traverse the tree and create a clone node for every node, recording which
clone belongs to which original as you go.

### Hint 2

Give each cloned node the clones of the original's children as its
children, so the copy mirrors the input's structure exactly.
