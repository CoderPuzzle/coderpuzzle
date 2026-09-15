# Solutions — Find Triangular Sum of an Array

## In-place adjacent-pair simulation

The process is deterministic and each round shrinks the array by exactly one
element, so simulating it directly costs n - 1 rounds of n, n - 1, … pair
sums — about n²/2 single-digit additions for n up to 1000. Every value stays
a digit: the sum of two digits modulo 10 is a digit again.

Rather than allocating a fresh array per round (as the process describes),
each language reuses one array as a shrinking working prefix — writing
`nums[i] = (nums[i] + nums[i+1]) % 10` left to right only touches positions
that later rounds still need, since position i's new value depends on the old
values at i and i + 1 and every write happens strictly before those cells are
read again. Python and Rust build each next row into its own list for the
same effect; JavaScript and TypeScript slice once to keep the caller's array
intact. When a single element remains it is the triangular sum.

**Complexity:** `O(n²)` time, `O(1)` extra space (in-place variants).
