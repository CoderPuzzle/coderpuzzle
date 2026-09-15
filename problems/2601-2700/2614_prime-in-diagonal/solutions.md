# Solutions — Prime In Diagonal

## Diagonal Scan with Primality Testing

Only cells on the two diagonals can ever be returned, so the whole matrix
matters only through 2n values: for each row index `i` those are
`nums[i][i]` and `nums[i][n-1-i]`. Walking both legs in one loop and keeping
the largest value that proves prime answers the question directly, and when
no diagonal cell is prime the running maximum simply stays at its initial 0,
which is exactly the required fallback.

Each candidate is tested by trial division: reject anything below 2, divide
by 2 once, then try odd factors while the factor squared still fits. A
composite always has a prime factor no larger than its square root, so the
loop can stop there — at most about `sqrt(4*10^6) = 2000` divisions per
candidate, over at most `2 * 300` candidates.

**Complexity:** `O(n · sqrt(V))` time, `O(1)` space.
