# Solutions — Palindrome Permutation

## Parity bitmask, one pass

A permutation of `s` can be rearranged into a palindrome exactly when at most
one character occurs an odd number of times. Reading a palindrome position by
position from both ends, characters pair up mirror-to-mirror, so every count
must be even — except that an odd-length palindrome has one unpaired character
standing in the middle. Since we are free to choose the arrangement, that is
the only fact about `s` that matters: "code" has four odd counts and no
rearrangement can fix that, while "aab" leaves exactly `a`'s partnerless
count odd and becomes "aba".

Rather than keeping a full count array, the code tracks only each count's
parity in a 26-bit mask, one bit per letter. Every occurrence of a letter
flips its bit, so after one pass over `s` the set bits are exactly the
characters with odd counts. Toggling with `^` means the second, fourth, …
occurrences cancel the earlier ones, and nothing about the order of `s`
survives — which is fine, because the criterion depends only on the counts.

The final test is `mask & (mask - 1) == 0`: subtracting one clears the lowest
set bit and borrows through the rest, so the product is zero exactly when no
two bits are set — zero odd counts for an even-length arrangement, one for the
middle character of an odd-length one. Any second odd count leaves a bit
standing and the answer `false`.

**Complexity:** `O(n)` time, `O(1)` space.
