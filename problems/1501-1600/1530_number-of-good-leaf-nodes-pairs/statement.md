# Number of Good Leaf Nodes Pairs

## Description

You are given the `root` of a binary tree and an integer `distance`. A pair
of two different leaf nodes of the tree is **good** if the length of the
shortest path between them is less than or equal to `distance`.

Return the number of good leaf node pairs in the tree.

### Example 1

![diagram](figures/1530-1.svg)

```text
Input: root = [1,2,3,null,4], distance = 3
Output: 1
```

The leaf nodes of the tree are `3` and `4`, and the length of the shortest
path between them is `3`. This is the only good pair.

### Example 2

![diagram](figures/1530-2.svg)

```text
Input: root = [1,2,3,4,5,6,7], distance = 3
Output: 2
```

The good pairs are `[4,5]` and `[6,7]`, each with shortest path `2`. The
pair `[4,6]` is not good because the length of the shortest path between
them is `4`.

### Example 3

```text
Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
Output: 1
```

The only good pair is `[2,5]`.

### Constraints

- The number of nodes in the tree is in the range `[1, 2¹⁰]`.
- `1 <= Node.val <= 100`
- `1 <= distance <= 10`

## Hints

### Hint 1

Start a DFS from each leaf node. Stop the DFS when the number of steps
taken exceeds `distance`.

### Hint 2

If you reach another leaf node within `distance` steps, add 1 to the
answer.

### Hint 3

Note that every pair gets counted twice this way, so divide the answer by 2.
