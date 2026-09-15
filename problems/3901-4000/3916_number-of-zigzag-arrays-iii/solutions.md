# Solutions — Number of ZigZag Arrays III

Only the number `m = r - l + 1` of available values matters. For fixed `n`,
the count is a polynomial in `m` of degree at most `n`, so a small set of
exact values determines the answer even when the range is enormous.

## Prefix-sum DP and Lagrange interpolation

For each width `m = 1..n+1`, keep counts by final value and by whether the last
move rose or fell. A rising move can only follow a falling move, and vice
versa; prefix sums of the falling counts and suffix sums of the rising counts
produce every transition in `O(m)` time. This gives the polynomial's values
at `n+1` consecutive points. If the requested width is one of them, return it
directly; otherwise evaluate the unique degree-`n` polynomial with the
consecutive-point Lagrange formula using factorials and inverse factorials.

All products are reduced modulo `10⁹ + 7` in 64-bit arithmetic. JavaScript and
TypeScript use exact `BigInt` only for interpolation products; their DP needs
addition alone and reduces after every addition, keeping its `Number` values
below twice the modulus.

**Complexity:** `O(n³)` time, `O(n)` space.
