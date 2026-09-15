# Solutions — Insert Greatest Common Divisors in Linked List

## In-place splice

Only new nodes are ever added — nothing is removed, reordered, or moved
before the head — so the original head always remains the answer and one
cursor is enough to build everything else. The cursor starts at `head` and
runs while a successor exists. At each stop it takes the gcd of the cursor
node's value and its successor's value, allocates one fresh node carrying
that value, threads it between the pair by pointing the cursor's `next` at
the new node while the new node keeps the old successor, then advances
straight to that untouched successor. Advancing past the inserted node is
what makes the walk linear and terminating: each original adjacent pair is
examined exactly once, and the loop stops on the final original node,
whose `next` was never changed from null.

Each insertion costs constant pointer work plus one Euclid reduction. With
`Node.val <= 1000`, any gcd of two node values fits an `int` comfortably
and settles in at most about ten division steps, so arithmetic never
dominates. Every inserted value divides both of its neighbors by
construction, which is exactly the statement's requirement — no post-pass
or validation sweep is needed. Inputs shorter than two nodes skip the loop
body entirely, so a single-node list comes back unchanged.

The result holds `2n - 1` nodes for an input of `n` nodes: the `n - 1`
inserted nodes are required output, not bookkeeping, so space beyond the
answer is just the cursor. The traversal is iterative by design — with up
to 5000 original nodes expanding to nearly ten thousand output nodes, the
obvious recursive restatement would push close to default interpreter and
JVM stack limits for no benefit.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output nodes.
