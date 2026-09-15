# Solutions — Divide a String Into Groups of Size k

## Pad once, then slice

Compute how many fill characters are needed to make the string length divisible by `k`, append exactly that many, and then take consecutive slices of length `k`. A divisible input receives zero padding because the remainder formula wraps back to zero.

Every original character remains in order and appears in exactly one slice. Only the final slice can contain appended fill characters, and every returned group has exactly `k` characters.

**Complexity:** `O(n + k)` time and `O(n + k)` output space.
