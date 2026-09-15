# Find Root of N-ary Tree

## Description

Given all the nodes of an n-ary tree packed into one array, return the
root of the tree. Every node carries a unique value, and the array holds
each node exactly once, in an arbitrary order.

Each node in the n-ary tree contains a value (int) and a list
(List[Node]) of its children.

```text
class Node {
    public int val;
    public List<Node> children;
}
```

An n-ary tree is serialized in its level order traversal, where each
group of children is separated by a `null` value (see the diagram):

![diagram](figures/1506-1.svg)

For example, the tree above serializes as
`[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`.

The judge drives every test the same way. The input arrives as the
tree's serialization; the driver decodes the tree, puts its Node objects
into an array in arbitrary order, and passes that array to `findRoot`.
Whatever node `findRoot` returns is serialized again, and the test
passes when that serialization equals the input.

### Example 1

![diagram](figures/1506-2.svg)

```text
Input: tree = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]
Explanation: The tree decoded from the input is shown above. The driver
hands findRoot its nodes in an arbitrary order — for example
[Node(5),Node(4),Node(3),Node(6),Node(2),Node(1)] — and findRoot returns
the root Node(1), whose serialization matches the input.
```

### Example 2

![diagram](figures/1506-3.svg)

```text
Input: tree = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
```

### Constraints

- The total number of nodes is in the range `[1, 5 * 10⁴]`.
- Each node has a unique value.

### Follow up

Could you solve the problem in constant space complexity with a linear
time algorithm?

## Hints

### Hint 1

Only the root has indegree zero: every other node appears exactly once
in some parent's children list. Collect the nodes and strike out every
node you see as a child — exactly one node survives.

### Hint 2

The follow-up asks you to drop the collection. Every non-root value
enters your accounting exactly twice — once as a node and once as a
child — while the root's value enters once. What kind of running
accumulation keeps only the value that survives an odd number of times?
