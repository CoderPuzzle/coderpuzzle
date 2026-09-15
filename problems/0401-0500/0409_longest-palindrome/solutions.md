# Solutions — Longest Palindrome

## Count pairs, add the middle

A palindrome reads the same in both directions, so every letter to the left
of the center must have a same-letter partner to its right: letters are used
in pairs. That turns the question into pure counting — one slot per letter of
the alphabet, with lowercase and uppercase kept separate because letters are
case sensitive.

Each slot's count splits into `count // 2` mirrored pairs plus possibly one
leftover letter. The pairs from every slot can all be used at once, each
contributing one letter to each wing, but the leftovers behave differently:
the wings mirror around a single center position, so at most one unpaired
letter can sit in the middle. Doubling the pair total gives both wings, and
adding 1 exactly when some count is odd claims the center for one leftover
while every other leftover goes unused.

One sweep over the string tallies the letters, one sweep over the 52 fixed
slots sums the pairs — and the table never grows with the input.

**Complexity:** `O(n)` time, `O(1)` space.
