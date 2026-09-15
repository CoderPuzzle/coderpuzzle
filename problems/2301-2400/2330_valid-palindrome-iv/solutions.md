# Solutions — Valid Palindrome IV

## Two-pointer mismatch count

Compare `s` from both ends inward and count the mirrored pairs whose
characters disagree. Each operation rewrites a single character, which lives
in exactly one mirrored pair, so every disagreeing pair consumes an operation
of its own — one or two operations can therefore reach a palindrome exactly
when at most two pairs disagree.

An already-palindromic string passes too: with zero disagreements, an even
length spends its two operations rewriting both ends of any one mirrored pair
to a fresh shared letter, and an odd length spends one on the lone middle
character. The answer is whether the count is at most two.

**Complexity:** `O(n)` time, `O(1)` space.
