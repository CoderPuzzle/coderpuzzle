# Solutions — Number of Times Binary String Is Prefix Aligned

## Approach: Running maximum against the step count

After `k` steps, the string is prefix-aligned exactly when the flipped
positions are precisely `{1, 2, ..., k}` — since every step flips a distinct
position, that holds if and only if the largest position flipped so far equals
`k`. So one pass tracks `rightmost`, the running maximum of `flips[0..i]`; the
count increments each time `rightmost == i + 1`. No bit array is needed and the
permutation property guarantees no double flips.

**Complexity:** `O(n)` time, `O(1)` space.
