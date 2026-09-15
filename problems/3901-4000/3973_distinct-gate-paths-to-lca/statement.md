# Distinct Gate Paths to LCA

## Description

You are given an undirected tree rooted at node 0 with `n` nodes numbered from
`0` to `n - 1`, represented by an array `parent` where `parent[i]` is the
parent of node `i`.

Each node `i` has three types of gates, given in a 2D array `gates` where
`gates[i] = [redᵢ, blueᵢ, whiteᵢ]` which represents the number of red, blue,
and white gates at node `i`.

- Red gate: usable only with a red card.
- Blue gate: usable only with a blue card.
- White gate: usable with either card, but flips the card color when used.

Alice and Bob start at given nodes with either a red or blue card (1 = red,
0 = blue). They must independently move upward to their lowest common ancestor
(LCA).

At each node, a person may move to their parent only if they can use at least
one gate at that node with their current card. White gates may be used any
number of times to flip the card color.

Movement rules (one move = from `u` to `parent[u]`):

- Movement is only upward toward the root.
- At node `u`, pick exactly one specific gate instance. Identical gates are
  treated as separate and counted individually.
- If holding a red card: use a red gate to remain red, or a white gate to
  change to blue.
- If holding a blue card: use a blue gate to remain blue, or a white gate to
  change to red.
- If no usable gate exists at `u`, the sequence ends.

You are also given a 2D array `queries` where
`queries[i] = [aNodeᵢ, aCardᵢ, bNodeᵢ, bCardᵢ]`:

- `aNodeᵢ`, `aCardᵢ`: Alice's starting node and card.
- `bNodeᵢ`, `bCardᵢ`: Bob's starting node and card.

For each query, count the number of distinct valid ways modulo `10⁹ + 7` for
both to reach their LCA.

After computing the result for all queries, return the bitwise XOR of those
values.

Note:

- Two ways are distinct if the set of gates used differs for either Alice or
  Bob.
- If any person is already at the LCA, then the number of ways for them is 1.
- The lowest common ancestor (LCA) is defined between two nodes `a` and `b` as
  the lowest node in a tree that has both `a` and `b` as descendants (where a
  node is allowed to be a descendant of itself).

### Example 1

```text
Input: n = 3, parent = [-1,0,0], gates = [[1,0,1],[0,1,1],[1,1,0]],
queries = [[1,0,2,0],[1,1,2,0],[1,0,2,1]]
Output: 1
Explanation:
    i | Alice [Node, Card] | Bob [Node, Card] | LCA | Alice Path |
    Bob Path | Alice Ways | Bob Ways | Total Ways

    0 | [1, 0]: Blue | [2, 0]: Blue | 0 | 1 → 0 | 2 → 0 |
    2 (1 Blue + 1 White at node 1) | 1 (1 Blue at node 2) | 2 × 1 = 2

    1 | [1, 1]: Red | [2, 0]: Blue | 0 | 1 → 0 | 2 → 0 |
    1 (1 White at node 1) | 1 (1 Blue at node 2) | 1 × 1 = 1

    2 | [1, 0]: Blue | [2, 1]: Red | 0 | 1 → 0 | 2 → 0 |
    2 (1 Blue + 1 White at node 1) | 1 (1 Red at node 2) | 2 × 1 = 2

    Thus, the XOR of all values: 2 XOR 1 XOR 2 = 1.
```

### Example 2

```text
Input: n = 3, parent = [-1,0,1], gates = [[0,1,2],[1,0,1],[0,0,3]],
queries = [[2,0,1,0],[2,1,0,0],[1,1,2,1]]
Output: 3
Explanation:
    i | Alice [Node, Card] | Bob [Node, Card] | LCA | Alice Path |
    Bob Path | Alice Ways | Bob Ways | Total Ways

    0 | [2, 0]: Blue | [1, 0]: Blue | 1 | 2 → 1 | 1 |
    3 (3 White at node 2) | 1 (no move) | 3 × 1 = 3

    1 | [2, 1]: Red | [0, 0]: Blue | 0 | 2 → 1 → 0 | 0 |
    3 (3 White at node 2) × 1 (1 White at node 1) = 3 | 1 (no move) |
    3 × 1 = 3

    2 | [1, 1]: Red | [2, 1]: Red | 1 | 1 | 2 → 1 |
    1 (no move) | 3 (3 White at node 2) | 1 × 3 = 3

    Thus, the XOR of all values: 3 XOR 3 XOR 3 = 3.
```

### Constraints

- `2 <= n <= 2 * 10⁴`
- `n == parent.length == gates.length`
- `parent[0] == -1`
- `0 <= parent[i] < n` for `i` in `[1, n - 1]`
- `gates[i] == [redᵢ, blueᵢ, whiteᵢ]`
- `0 <= redᵢ, blueᵢ, whiteᵢ <= 10`
- `1 <= queries.length <= 2 * 10⁴`
- `queries[i] = [aNodeᵢ, aCardᵢ, bNodeᵢ, bCardᵢ]`
- `0 <= aNodeᵢ, bNodeᵢ <= n - 1`
- `0 <= aCardᵢ, bCardᵢ <= 1`
- The input is generated such that the array `parent` represents a valid tree.

## Hints

### Hint 1

For one node, the transition between card colors can be represented by a
2 x 2 matrix: red and blue gates keep the same color, while white gates switch
the color.

### Hint 2

Use binary lifting for ancestors, and store the product of transition matrices
for each upward jump.

### Hint 3

For a query, find the LCA, compute the number of ways for Alice and Bob to
move from their nodes to it, sum over both possible ending card colors,
multiply the two values modulo `10⁹ + 7`, then XOR it into the answer.
