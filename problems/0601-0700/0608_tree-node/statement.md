# Tree Node

## Description

Table: `Tree`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| p_id        | int  |

`id` is the column with unique values for this table.
Each row of this table contains information about the id of a node and the
id of its parent node in a tree.
The given structure is always a valid tree.

Each node in the tree can be one of three types:

- **"Leaf"**: if the node is a leaf node.
- **"Root"**: if the node is the root of the tree.
- **"Inner"**: if the node is neither a leaf node nor a root node.

Write a solution to report the type of each node in the tree.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Tree` table
with that testcase's rows, the root's parent given as NULL. The result
format is in the following example.

### Example 1

![diagram](figures/608-1.svg)

```text
Input: Tree table from the dataset below.
Output:
id  type
1   Root
2   Inner
3   Leaf
4   Leaf
5   Leaf
Explanation: node 1 is the root node because its parent is NULL and it has
child nodes 2 and 3. Node 2 is an inner node because it has parent node 1
and child nodes 4 and 5. Nodes 3, 4, and 5 are leaf nodes because they have
parent nodes and no child nodes of their own.
```

![diagram](figures/608-2.svg)

Write your solution as a single `SELECT` query returning two columns —
`id` and `type` — with one row for every node in the `Tree` table.

## Hints

### Hint 1

The two facts that decide a node's type are independent: whether the node's
own `p_id` is NULL (only the root has no parent), and whether the node's
`id` ever shows up in some other row's `p_id` (that row would be its child).
Root-hood comes from the first fact, leaf-hood from the second, and inner
nodes are what remains.

### Hint 2

A CASE expression testing the parent first and the children second spells
the three-way split: `WHEN p_id IS NULL THEN 'Root'` must come first,
because the root also has no children and would otherwise be mislabeled a
leaf — after it, "no row points at me" picks out exactly the leaves, and
ELSE catches the nodes with both a parent and children.

### Hint 3

The child test hides a NULL trap: `id NOT IN (SELECT p_id FROM Tree)` never
fires, because the root's own row contributes a NULL `p_id` to that
subquery and `x NOT IN (... NULL ...)` is unknown under three-valued logic
— filter the subquery with `WHERE p_id IS NOT NULL`, or replace it with
`NOT EXISTS (SELECT 1 FROM Tree c WHERE c.p_id = Tree.id)`, which compares
NULLs away instead of collecting them.
