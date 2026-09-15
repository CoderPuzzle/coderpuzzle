# Closest Nodes Queries in a Binary Search Tree

## Description

You are given the `root` of a binary search tree and an array `queries`
of size `n` consisting of positive integers.

Find a 2D array `answer` of size `n` where `answer[i] = [mini, maxi]`:

- `mini` is the largest value in the tree that is smaller than or equal to
  `queries[i]`. If such a value does not exist, add `-1` instead.
- `maxi` is the smallest value in the tree that is greater than or equal to
  `queries[i]`. If such a value does not exist, add `-1` instead.

Return the array `answer`.

### Example 1

```text
Input: root = [6,2,13,1,4,9,15,null,null,null,null,null,null,14], queries = [2,5,16]
Output: [[2,2],[4,6],[15,-1]]
Explanation: We answer the queries in the following way:
- The largest number that is smaller or equal than 2 in the tree is 2, and the
  smallest number that is greater or equal than 2 is still 2. So the answer for
  the first query is [2,2].
- The largest number that is smaller or equal than 5 in the tree is 4, and the
  smallest number that is greater or equal than 5 is 6. So the answer for the
  second query is [4,6].
- The largest number that is smaller or equal than 16 in the tree is 15, and
  the smallest number that is greater or equal than 16 does not exist. So the
  answer for the third query is [15,-1].
```

![BST [6,2,13,1,4,9,15,null,null,null,null,null,null,14]; queries [2,5,16] get [[2,2],[4,6],[15,-1]].](figures/example-1.svg)

### Example 2

```text
Input: root = [4,null,9], queries = [3]
Output: [[-1,4]]
Explanation: The largest number that is smaller or equal than 3 in the tree
does not exist, and the smallest number that is greater or equal than 3 is 4.
So the answer for the query is [-1,4].
```

![The two-node BST [4,null,9]; query 3 has no value <= 3 below it, giving [-1,4].](figures/example-2.svg)

### Constraints

- The number of nodes in the tree is in the range `[2, 10⁵]`.
- `1 <= Node.val <= 10⁶`
- `n == queries.length`
- `1 <= n <= 10⁵`
- `1 <= queries[i] <= 10⁶`

## Hints

### Hint 1

Try to first convert the tree into a sorted array with an inorder traversal.

### Hint 2

Each query is then a pair of binary searches on the sorted array: the last value <= query and the first value >= query.
