# Solutions — Decrease Elements To Make Array Zigzag

## Two greedy patterns, take the cheaper

Since moves only decrease values, the only elements ever worth touching are
the _valleys_ — the ones a pattern requires to be strictly smaller than
their neighbors. In the pattern where even indices hold the peaks, the odd
indices must be valleys, and vice versa. A valley that already sits below
both neighbors costs nothing; otherwise it must drop to
`min(left, right) - 1`, costing `valley - min(left, right) + 1`.

The key observation that makes summing these local costs globally optimal
is that the two parities never interact: a valley's neighbors are peaks of
the untouched parity, so lowering one valley cannot disturb any other
valley's requirement, and lowering a peak could only ever make things
harder, never easier — the pattern's peaks should keep their original
values. Each pattern's cost is therefore a simple sum over its valley
positions, and the answer is the smaller of the two.

The total is bounded by `n · 1000`, far inside 32-bit range, and the scan
is a single pass per pattern.

**Complexity:** `O(n)` time — two linear passes — and `O(1)` extra space.
