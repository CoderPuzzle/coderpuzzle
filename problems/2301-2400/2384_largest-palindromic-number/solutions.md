# Solutions — Largest Palindromic Number

## Count pairs and build out from the center

A palindrome is determined by its left half plus an optional center digit,
so the largest one is found by spending each digit's full pairs — highest
digit first — into the left half, which maximizes both length and
lexicographic order simultaneously. Any digit left over (odd count) can
occupy the center; the best center is simply the largest such digit.

Leading zeroes are the one trap: a half consisting only of zero pairs
produces a string starting with `'0'`, which must be dropped entirely
(zero pairs are worthless without a nonzero digit ahead of them). If every
digit is a zero, the lone digit `"0"` itself is the answer — it uses at
least one digit and has no leading-zero problem.

**Complexity:** `O(n)` time, `O(1)` space.
