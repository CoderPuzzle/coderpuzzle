# Solutions — Missing Number In Arithmetic Progression

## Subtract the surviving sum from the full progression's sum

The endpoints survive the removal, so the first and last values still bound
the original progression. With `n = arr.length` surviving values, the whole
progression held `n + 1` terms running from `arr[0]` to `arr[-1]`, and its
sum is the Gauss formula `(first + last) * (n + 1) / 2` — valid for a
decreasing progression too, since a negative common difference only makes the
pairwise sum smaller, never the formula.

The removed value is exactly the difference between that full sum and the sum
of what survived. Every surviving element is accounted for on both sides, so
the arithmetic cancels to the single missing term.

**Complexity:** `O(n)` time, `O(1)` space.
