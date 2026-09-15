# Remove Palindromic Subsequences

## Approach: Two letters bound the answer at two steps

With only the letters `a` and `b`, every answer is at most 2: the
subsequence of all `a`s is itself a palindrome (any run of one letter
reads the same both ways), so removing all `a`s and then all `b`s always
empties the string in two steps. The only better outcome is 1, which
happens exactly when the whole string is already a palindrome — one step
removes it entirely.

A two-pointer inward scan checks palindromicity in O(n); a non-palindrome
necessarily contains both letters in mismatched order, so two steps are
also required — no input needs more.

**Complexity:** O(n) time, O(1) space.
