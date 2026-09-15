# Solutions — Construct K Palindrome Strings

## Parity bound on odd-count letters

Every palindrome can absorb at most one letter with an odd total count — its middle character — so if `s` contains `odd` letters whose frequency is odd, any valid split needs at least `odd` palindromes. In the other direction, splitting needs `k` non-empty strings, so `s` must hold at least `k` characters. Both lower bounds are simultaneously achievable: with `odd <= k <= len(s)` the extra palindromes beyond `odd` each take a symmetric pair of same-letter characters, and any surplus single letters pair up inside shared strings.

The code first rejects `len(s) < k`, then tallies the 26 letter frequencies and counts how many are odd. The answer is exactly that odd count being at most `k`.

One linear scan over `s` plus a constant 26-slot pass gives linear time, and the tally array is constant space.

**Complexity:** `O(n)` time, `O(1)` extra space, where `n` is the length of `s`.
