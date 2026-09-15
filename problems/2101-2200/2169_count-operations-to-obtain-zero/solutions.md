# Solutions — Count Operations to Obtain Zero

## Direct subtraction simulation

The rules leave no choice to make: each operation replaces the larger of
the two values by their difference. Simulating that loop until one side
hits zero is the whole solution — the pair strictly shrinks every round,
so the loop always terminates.

The step count stays small because the process is the subtractive
Euclidean algorithm: consecutive Fibonacci inputs are the classic slow
case and even they finish in a few dozen steps at these bounds, well under
any limit.

**Complexity:** `O(log(min(num1, num2)))`-ish rounds (subtractive Euclid;
`O(max(num1, num2))` in the worst case), `O(1)` space.
