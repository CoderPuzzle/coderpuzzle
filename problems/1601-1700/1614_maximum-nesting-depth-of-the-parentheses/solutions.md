# Solutions — Maximum Nesting Depth of the Parentheses

## Running depth counter

Because `s` is guaranteed to be a valid parentheses string, a single pass
is enough: track a running `depth` that increments on every `(` and
decrements on every `)`, and every other character — digits and the four
arithmetic operators — is simply skipped. The nesting depth at any point
in the string is exactly this running count, so the answer is its maximum
value over the whole scan.

No stack of matched brackets is needed; only the depth's current value
matters, never which specific parenthesis produced it. Updating a running
maximum alongside the counter turns the whole computation into one linear
scan with two integer variables.

**Complexity:** `O(n)` time, `O(1)` space.
