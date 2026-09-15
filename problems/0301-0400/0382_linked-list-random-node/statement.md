# Linked List Random Node

## Description

Given a singly linked list, return a random node's value from the linked list.
Each node must have the same probability of being chosen.

Implement the `Solution` class:

- `Solution(int[] head)` Initializes the object with the head of the
  singly-linked list `head`.
- `int getRandom()` Chooses a node randomly from the list and returns its
  value. All the nodes of the list should be equally likely to be chosen.

Because the judge passes plain arrays, the linked list arrives in wire form
as one argument: `head`, the node values in order. Treat position `i` of that
array as the `i`-th node of the list; there is no need to build an actual
chained structure.

### Statistical judging

`getRandom` picks a node **uniformly at random**, exactly as on LeetCode —
the judge verifies this statistically rather than comparing a single draw.
Each judged `getRandom` is invoked ~25000 times, every returned value must be
one of the list's node values, and the empirical frequency of each value must
fall within a tolerance band of its probability `count(value) / n` — a value
that appears on several nodes is correspondingly more likely to come back.
Any correct uniform sampler passes.

### Example 1

```text
Input:
["Solution", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"]
[[[1, 2, 3]], [], [], [], [], []]
Output: [null, 1, 3, 2, 2, 3]
Explanation:
Solution solution = new Solution([1, 2, 3]);
solution.getRandom(); // return 1
solution.getRandom(); // return 3
solution.getRandom(); // return 2
solution.getRandom(); // return 2
solution.getRandom(); // return 3
// getRandom() should return either 1, 2, or 3 randomly. Each element
// should have equal probability of returning.
```

### Example 2

```text
Input:
["Solution", "getRandom", "getRandom"]
[[[-9, -9, 4]], [], []]
Output: [null, -9, 4]
Explanation:
Solution solution = new Solution([-9, -9, 4]);
solution.getRandom(); // return -9 — the value -9 sits on two of the three
                      // nodes, so it is twice as likely as 4
solution.getRandom(); // return 4
```

### Constraints

- The number of nodes in the linked list will be in the range `[1, 10⁴]`.
- `-10⁴ <= Node.val <= 10⁴`
- At most `10⁴` calls will be made to `getRandom`.

### Follow-up

What if the linked list is extremely large and its length is unknown to you?
Could you solve this efficiently without using extra space?

## Hints

### Hint 1

Nothing about the chaining matters to a sampler that must treat every node
equally: one traversal visits exactly one node per step, in a fixed order.
Materialize what such a traversal would visit, and uniform-over-nodes becomes
uniform-over-slots of that materialized sequence.

### Hint 2

Uniform over slots is a single random integer: draw an index `i` uniformly
from `[0, n)` and return the value stored at slot `i`. Building the sequence
once in the constructor makes every `getRandom` an `O(1)` draw.

### Hint 3

The follow-up removes both luxuries — known length and `O(n)` memory. Walk
the list one node at a time keeping a single candidate: when you reach the
`k`-th node, replace the candidate with it with probability exactly `1/k`.
Check by induction that after `n` nodes every node is the survivor with
probability `1/n`, using only two counters and one value.
