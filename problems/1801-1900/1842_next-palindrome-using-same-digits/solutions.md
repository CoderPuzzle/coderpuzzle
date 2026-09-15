# Solutions — Next Palindrome Using Same Digits

A palindrome is completely determined by its first `floor(n/2)` digits:
the rest is their mirror image, and for odd lengths the middle digit is
its own mirror, fixed by the digit multiset (a palindrome of odd length
must contain a digit with odd count, and the middle is where it sits).
Comparing two same-length palindromes therefore reduces to comparing their
halves — the smallest larger palindrome comes from the smallest strictly
larger half.

## Next permutation on the half, then mirror

Run a classic next-permutation on the first `floor(n/2)` digits. Scan
from the right for the first ascent `half[i] < half[i+1]`; if there is no
ascent the half is non-increasing and already maximal, so no larger
palindrome exists and the answer is `""` (example 2's `"32123"`, whose
half `"32"` is decreasing). Otherwise swap `half[i]` with the smallest
digit to its right that exceeds it, reverse the suffix after position
`i`, and mirror: append the reversed half for even lengths, or the middle
character followed by the reversed half for odd ones. That yields exactly
the next permutation of the whole multiset arranged as a palindrome,
which is provably the immediate successor among palindromic
rearrangements.

The scan touches each half-digit a constant number of times, so the work
is linear in `n` — essential at the `10⁵` length ceiling, where any
permutation-enumeration approach is hopeless. Extra space is the half and
its mirror.

**Complexity:** `O(n)` time, `O(n)` space.
