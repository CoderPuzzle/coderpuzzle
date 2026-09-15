# Solutions — Sum of k-Mirror Numbers

## Generate decimal palindromes

Enumerate decimal palindromes in increasing digit length and increasing first half. Mirror the whole half for an even length and all but its last digit for an odd length; this produces every positive base-10 palindrome exactly once and in numeric order, avoiding a scan through non-palindromes.

For each candidate, reverse its base-`k` digits arithmetically and compare the reversed value with the candidate. Add candidates that are also palindromic in base `k` until `n` have been accepted, using 64-bit accumulation in fixed-width languages.

**Complexity:** `O(P logₖ M)` time and `O(1)` auxiliary space, where `P` decimal palindromes are tested through the largest accepted value `M`.
