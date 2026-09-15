# Solutions — Function Composition

Composing [f1, f2, ..., fn] means evaluating the array from its tail: fn
receives x, each earlier function consumes the previous output, and the
head produces the answer. The submission itself returns a closure over the
array so the judged call site stays `composed(x)`.

## Right-to-Left Accumulator Loop

`compose` returns a closure that seeds an accumulator with `x` and walks
index `functions.length - 1` down to `0`, replacing the accumulator with
`functions[i](accumulator)` each step. Applying index order backwards is
exactly the statement's definition — `fn(x) = f(g(h(x)))` means h runs
first even though f is listed first — so after the pass the accumulator
holds f(...(fn(x))...). No stack recursion is involved anywhere: chaining
depths reach 1000 by constraint, and the flat index loop evaluates
them with constant call-stack depth while still routing through every
function in the array, which the driver verifies with its per-function
call counts.

The empty array skips the loop entirely, returning `x` untouched — the
identity case falls out of the same code path rather than needing a
special branch. Constant and argument-ignoring functions behave like any
other entry: they are still applied exactly once in chain order, so rows
that collapse mid-chain (a `x => 0` planted before other steps) thread
their inputs correctly through everything around them.

**Complexity:** `O(n)` time, `O(1)` extra space, where n is
`functions.length`.
