# Solutions — Score of Parentheses

The three rules never multiply anything but a wrapped whole: concatenation
only adds, and a wrapping pair only doubles. That makes the `"()"` pair the
sole source of value — every score is a sum over the cores of the string,
each core weighted only by how deeply it sits.

## Depth powers

Unwrap a single core: a `"()"` wrapped by `d` further pairs has rule three
applied to it `d` times, so it is worth exactly `2^d`. Concatenation cannot
change any core's worth — it only adds sibling contributions — so the score
of the whole string is the sum of `2^d` over every core, with `d` the number
of pairs open around it. `(())` holds one core at depth 1 and scores 2,
while `()()` holds two cores at depth 0 and scores `1 + 1`.

One sweep carries just the open-paren depth. A `'('` raises it, a `')'`
lowers it, and a `')'` whose predecessor is `'('` has just closed a core —
the post-decrement depth is exactly the count of pairs wrapping that core —
so `1 << depth` is added on the spot. `(()(()))` scores `2 + 4 = 6`: one
core at depth 1, one at depth 2. The deepest legal string, 25 nested pairs,
closes its only core at depth 24 and scores `2^24`, still far inside a
32-bit integer.

**Complexity:** `O(n)` time, `O(1)` space.
