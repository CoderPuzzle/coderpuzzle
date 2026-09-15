# Solutions — Number of People That Can Be Seen in a Grid

## Monotonic stacks per row and column

Visibility decomposes cleanly: a person sees some set of people to the right and some set below, so the answer grid is the sum of an independent horizontal pass and an independent vertical pass. For one direction, scan from the far end backwards while maintaining a stack of heights that are still visible from the scanning frontier — the heights on the stack are exactly the people some future (more leftward) observer could still see, and they form a strictly decreasing sequence from bottom to top.

When person `x` is processed, everyone on the stack with height strictly below `x` is popped and counted: each of them is visible to `x`, because everyone between them and `x` is shorter than they are. If the stack is still nonempty afterwards, its top is the first person of height at least `x`, and that person is visible too — the "everyone in between shorter than both" rule is satisfied since all in-between people were just popped as strictly shorter than `x`. Equal heights get exactly this treatment: an equally tall person is visible, then blocks everything beyond, which is why the count adds 1 for a `>=` top, but the subsequent cleanup pops entries `<= x` so the equal person cannot be seen _through_ by anyone further back.

The horizontal pass runs this per row (right to left), the vertical pass per column (bottom to top), and both counts accumulate into the same `res` cell. Every height is pushed and popped at most once per pass, so the total work is linear in the grid; the stacks hold at most one row's or one column's worth of scalars at a time, transiently.

**Complexity:** `O(mn)` time, `O(m + n)` space.
