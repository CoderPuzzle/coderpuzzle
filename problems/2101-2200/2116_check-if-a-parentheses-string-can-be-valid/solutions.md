# Solutions — Check if a Parentheses String Can Be Valid

## Track the reachable balance interval

Scan from left to right while tracking the minimum and maximum possible unmatched opening-parenthesis balance. A locked parenthesis changes both bounds by one; an unlocked position can decrease the minimum or increase the maximum. Clamp the minimum to zero, since any reachable negative balance is unusable.

If the maximum ever becomes negative, no assignment can repair that prefix. After an even-length string is fully scanned, it is valid exactly when zero remains in the reachable interval.

**Complexity:** `O(n)` time and `O(1)` space.
