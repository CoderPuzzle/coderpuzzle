# Solutions — Calculator with Method Chaining

Method chaining only asks that every operation return the calculator
itself, so a single mutable field plus fluent methods is the whole design.

## Mutable Accumulator and Fluent Methods

Store the current result in one field of the `Calculator`. Each arithmetic
method updates that field and returns `this`, so the next method in a chain
receives the same calculator with the new value. `getResult` simply exposes
the accumulated value, while `divide` checks its argument before updating and
throws the required error when that argument is zero.

The `Solution.solve` adapter passes the completed class to the bundle-provided
case driver. The driver constructs the calculator from the first value and
performs the action script sequentially, which exercises the same fluent API
shown in the examples without changing the calculator implementation.

**Complexity:** `O(k)` time, `O(1)` space for a chain of `k` operations.
