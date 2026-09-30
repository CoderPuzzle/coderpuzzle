# Solutions — Linked List Random Node

## Array of Values, Uniform Slot Draw

The requirement is that every **node** be equally likely, and the wire form already hands the constructor the node values in order — so one copy of that array is a faithful materialization of the list. `getRandom` then reduces to the simplest nontrivial distribution in the book: draw an index uniformly from `[0, n)` and return the value at that slot. Because each node occupies exactly one slot, a uniform slot is a uniform node; a value stored on several nodes is returned correspondingly more often, which is exactly the semantics the statistical judge checks (each judged `getRandom` is invoked ~25000 times and every value's empirical frequency must match `count(value) / n` within a tolerance band).

Both the Python and Java canonical solutions do precisely this. Python's `random.randrange(n)` and Java's `ThreadLocalRandom.current().nextInt(n)` are uniform over the `n` possible indices, so `O(1)` work per call.

**Complexity:** `O(n)` construction, `O(1)` per `getRandom`, `O(n)` space.
