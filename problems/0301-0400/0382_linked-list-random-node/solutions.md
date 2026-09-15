# Solutions — Linked List Random Node

## Array of Values, Uniform Slot Draw

The requirement is that every **node** be equally likely, and the wire form already hands the constructor the node values in order — so one copy of that array is a faithful materialization of the list. `getRandom` then reduces to the simplest nontrivial distribution in the book: draw an index uniformly from `[0, n)` and return the value at that slot. Because each node occupies exactly one slot, a uniform slot is a uniform node; a value stored on several nodes is returned correspondingly more often, which is exactly the semantics the statistical judge checks (each judged `getRandom` is invoked ~25000 times and every value's empirical frequency must match `count(value) / n` within a tolerance band).

Both the Python and Java canonical solutions do precisely this. Python's `random.randrange(n)` and Java's `ThreadLocalRandom.current().nextInt(n)` are uniform over the `n` possible indices, so `O(1)` work per call.

**Complexity:** `O(n)` construction, `O(1)` per `getRandom`, `O(n)` space.

## Reservoir Sampling (Follow-up)

When the list is extremely large or its length is unknown, the `O(n)` array is the part to give up — and it can be given up. Walk the nodes in order holding a single `candidate` and a counter `k` of nodes seen so far. When the `k`-th node arrives, replace the candidate with it with probability exactly `1/k` (a uniform draw from `[0, k)` succeeding on one outcome).

Induction shows this stays uniform forever: if the candidate is uniform over the first `k - 1` nodes, it survives the `k`-th step with probability `(k - 1) / k`, and the new node wins with probability `1/k`, so every one of the `k` nodes ends up held with probability `1/k` — reservoir sampling with a reservoir of size one. The cost is one random draw per node of a **single streaming pass** and two words of state, but each `getRandom` can no longer be `O(1)`: with only the live candidate retained, re-drawing means re-walking, so the array version above is the right structure when the length is known.

**Complexity:** `O(1)` extra space, one pass per draw over the (unknown-length) stream.
