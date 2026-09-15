# Solutions — Generate Circular Array Values

The whole problem is the two-sided resume protocol plus one arithmetic
decision. The generator owns nothing but its current index; every yield
suspends it with the caller's next jump in hand, so the case's steps
sequence drives the walk from outside and the generator itself never
decides when to stop.

## Ring-Index Generator with Double Modulo

The first resume is parameterless — `yield arr[startIndex]` runs before
any jump exists — and its `yield` expression evaluates to the value the
caller sends with the _next_ `next(jump)`, which is exactly the jump the
walk needs. Each subsequent turn moves the index by that jump and wraps
it with `((index + jump) % n + n) % n`: JavaScript's `%` keeps the sign
of the dividend, so a single modulo would leave a negative index, and
the outer correction folds it back into `[0, n)`. That one expression
covers every case in the statement — the last index jumping forward to
the first, the first index jumping backward to the last, jumps equal to
or larger than the array, and zero jumps that hold position.

The loop is deliberately unbounded: the walk never terminates, so
termination is the driver's concern. A jump of ±10⁴ against an array of
10⁴ slots stays exact in Number arithmetic, and each resume costs one
modulo pair and one array read.

**Complexity:** `O(1)` per `next()` resume, `O(1)` auxiliary space
beyond the caller's array.
