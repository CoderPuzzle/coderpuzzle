# Minimum Number of Operations to Sort a Binary Tree by Level

## Description

You are given the `root` of a binary tree with unique values.

In one operation, you can choose any two nodes at the same level and swap
their values.

Return the minimum number of operations needed to make the values at each
level sorted in a strictly increasing order.

The level of a node is the number of edges along the path between it and the
root node.

### Example 1

```text
Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation:
- Swap 4 and 3. The 2nd level becomes [3,4].
- Swap 7 and 5. The 3rd level becomes [5,6,8,7].
- Swap 8 and 7. The 3rd level becomes [5,6,7,8].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
```

![Tree [1,4,3,7,6,8,5,null,null,null,null,9,null,10]; three numbered swaps sort levels 2 and 3.](figures/example-1.svg)

### Example 2

```text
Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Swap 3 and 2. The 2nd level becomes [2,3].
- Swap 7 and 4. The 3rd level becomes [4,6,5,7].
- Swap 6 and 5. The 3rd level becomes [4,5,6,7].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
```

![Tree [1,3,2,7,6,5,4]; swaps 3<->2, 7<->4 and 6<->5 sort both levels in 3 operations.](figures/example-2.svg)

### Example 3

```text
Input: root = [1,2,3,4,5,6]
Output: 0
Explanation: Each level is already sorted in increasing order so return 0.
```

![Tree [1,2,3,4,5,6] with levels [1], [2,3] and [4,5,6] already sorted, needing 0 operations.](figures/example-3.svg)

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁵]`.
- `1 <= Node.val <= 10⁵`
- All the values of the tree are unique.

## Hints

### Hint 1

We can group the values level by level and solve each group independently.

### Hint 2

Do BFS to group the values level by level.

### Hint 3

Find the minimum number of swaps to sort the array of each level.

### Hint 4

While iterating over the array, check the current element, and if it is not in the correct index, swap it with the element that should have come.
