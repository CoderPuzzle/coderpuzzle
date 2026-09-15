# Finish Time of Tasks II

## Description

You are given an integer `n` representing the number of tasks in a project,
numbered from 0 to `n - 1`. These tasks are connected as an undirected tree.
This is represented by a 2D integer array `edges` of length `n - 1`, where
`edges[i] = [ui, vi]` indicates an undirected connection between task `ui` and
task `vi`.

You are also given an array `baseTime` of length `n`, where `baseTime[i]`
represents the time to complete task `i`.

For any chosen task as the root, the finish time of each task is calculated as
follows:

- Leaf task: The finish time is `baseTime[i]`.
- Non-leaf task:
    - Let `earliest` be the minimum finish time among its children, and `latest`
      be the maximum finish time among its children.
    - Let `ownDuration` be `(latest - earliest) + baseTime[i]`.
    - Finish time of task `i` is `latest + ownDuration`.

Choose any task as the root and compute the finish time of that root based on
the rules above.

Return the minimum possible finish time among all choices of root.

### Example 1

```text
Input: n = 3, edges = [[0,1],[1,2]], baseTime = [9,1,5]
Output: 14
Explanation:
The optimal choice is to treat task 1 as the root.

Task 0 is a leaf, so its finish time is baseTime[0] = 9.
Task 2 is a leaf, so its finish time is baseTime[2] = 5.
Task 1 has two children with finish times 9 and 5:
earliest = 5, latest = 9
ownDuration = (latest - earliest) + baseTime[1] = (9 - 5) + 1 = 5
Finish time of task 1 is latest + ownDuration = 9 + 5 = 14
Thus, the minimum possible finish time among all choices of root is 14.
```

### Example 2

```text
Input: n = 3, edges = [[0,1],[0,2]], baseTime = [4,7,6]
Output: 12
Explanation:
The optimal choice is to treat task 0 as the root.

Task 1 is a leaf, so its finish time is baseTime[1] = 7.
Task 2 is a leaf, so its finish time is baseTime[2] = 6.
Task 0 has two children with finish times 7 and 6:
earliest = 6, latest = 7
ownDuration = (latest - earliest) + baseTime[0] = (7 - 6) + 4 = 5
Finish time of task 0 is latest + ownDuration = 7 + 5 = 12
Thus, the minimum possible finish time among all choices of root is 12.
```

### Example 3

```text
Input: n = 4, edges = [[0,1],[0,2],[2,3]], baseTime = [5,8,2,1]
Output: 16
Explanation:
The optimal choice is to treat task 1 as the root.

Task 3 is a leaf, so its finish time is baseTime[3] = 1.
Task 2 has one child task 3:
earliest = latest = 1
ownDuration = (latest - earliest) + baseTime[2] = 0 + 2 = 2
Finish time of task 2 is latest + ownDuration = 1 + 2 = 3

Task 0 has one child task 2:
earliest = latest = 3
ownDuration = (latest - earliest) + baseTime[0] = 0 + 5 = 5
Finish time of task 0 is latest + ownDuration = 3 + 5 = 8

Task 1 has one child task 0:
earliest = latest = 8
ownDuration = (latest - earliest) + baseTime[1] = 0 + 8 = 8
Finish time of task 1 is latest + ownDuration = 8 + 8 = 16
Thus, the minimum possible finish time among all choices of root is 16.
```

### Constraints

- `1 <= n <= 10⁵`
- `edges.length = n - 1`
- `edges[i] == [ui, vi]`
- `0 <= ui, vi <= n - 1`
- `ui != vi`
- The input is generated such that `edges` represents a valid undirected tree.
- `baseTime.length == n`
- `1 <= baseTime[i] <= 10⁵`

## Hints

### Hint 1

Rooting the tree at different nodes only changes which neighbors are treated as children.

### Hint 2

For every directed edge u -> v, compute the finish time of the component on the v side when u is considered its parent.

### Hint 3

Use rerooting DP: after computing values from children to parent, propagate values from parent to children.

### Hint 4

For each node, you only need the minimum and maximum finish times among all neighboring components to compute its finish time as the root.
