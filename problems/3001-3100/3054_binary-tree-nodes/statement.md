# Binary Tree Nodes

## Description

Table: `Tree`

| Column Name | Type |
| ----------- | ---- |
| N           | int  |
| P           | int  |

`N` is the column of unique values for this table.
Each row includes `N` and `P`, where `N` represents the value of a node
in a binary tree, and `P` is the parent of `N`. The root of the tree is
the one node whose `P` is null.

Write a solution to find the node type of the binary tree. Output one of
the following for each node:

- **"Root"**: if the node is the root node.
- **"Leaf"**: if the node is a leaf node.
- **"Inner"**: if the node is neither root nor leaf node.

Return the result table ordered by node value in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Tree` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input:
Tree table:
+---+------+
| N | P    |
+---+------+
| 1 | 2    |
| 3 | 2    |
| 6 | 8    |
| 9 | 8    |
| 2 | 5    |
| 8 | 5    |
| 5 | null |
+---+------+
Output:
+---+-------+
| N | Type  |
+---+-------+
| 1 | Leaf  |
| 2 | Inner |
| 3 | Leaf  |
| 5 | Root  |
| 6 | Leaf  |
| 8 | Inner |
| 9 | Leaf  |
+---+-------+
Explanation:
- Node 5 is the root node since it has no parent node.
- Nodes 1, 3, 6, and 9 are leaf nodes because they don't have any child
nodes.
- Nodes 2 and 8 are inner nodes as they serve as parents to some of the
nodes in the structure.
```

Write your solution as a single `SELECT` query returning two columns —
`N` and `Type` — with one row for every node in the `Tree` table.

## Hints

### Hint 1

A node's type rests on two facts that can be checked separately: it is
the root exactly when its own `P` is null, and it is a leaf exactly when
no other row's `P` names it.

### Hint 2

Both facts are tests over the same table, so one `CASE` expression
classifies every row. Order the arms carefully — a single-node tree's
root is childless too, so the root test (`WHEN P IS NULL`) must come
above the leaf test, with `ELSE` collecting the nodes that are neither.

### Hint 3

The leaf test hides a NULL trap: `N NOT IN (SELECT P FROM Tree)` never
fires, because the root's own row contributes a NULL to the subquery and
`x NOT IN (..., NULL, ...)` is unknown for every x under three-valued
logic. Filter the subquery with `WHERE P IS NOT NULL`, or switch to
`NOT EXISTS`, which never compares against a collected NULL.
