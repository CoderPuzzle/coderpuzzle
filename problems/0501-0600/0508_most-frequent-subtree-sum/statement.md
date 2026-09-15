# Most Frequent Subtree Sum

## Description

Given the `root` of a binary tree, return the most frequent subtree sum. If there is a tie, return all the values with the highest frequency in any order.

The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).

On LeetCode the tied values may come back in any order; this judge compares arrays exactly, so return them sorted in ascending order — every answer the original accepts is the same set of values as this one.

### Example 1

![diagram](figures/508-1.svg)

```text
Input: root = [5,2,-3]
Output: [-3,2,4]
Explanation: The subtree sums are 2, -3, and 4, and each occurs once, so all
three values are returned. LeetCode's example lists them as [2,-3,4]; this
judge's exact comparison pins them to ascending order.
```

### Example 2

![diagram](figures/508-2.svg)

```text
Input: root = [5,2,-5]
Output: [2]
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁴]`.
- `-10⁵ <= Node.val <= 10⁵`
