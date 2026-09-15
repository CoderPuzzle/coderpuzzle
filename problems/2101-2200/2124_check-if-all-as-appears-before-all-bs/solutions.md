# Solutions — Check if All A's Appears Before All B's

## Scan after the first b

Once a `b` has appeared, every remaining character must also be `b`. Scan from left to right, remember whether a `b` has been seen, and reject any later `a`.

**Complexity:** `O(n)` time and `O(1)` space.
