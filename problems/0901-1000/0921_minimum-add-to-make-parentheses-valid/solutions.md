# Solutions — Minimum Add to Make Parentheses Valid

A move only inserts a parenthesis, never rearranges, so the sole question
is how many parentheses are missing — not where they end up. A `')'` that
arrives when nothing is open can never be matched by anything to its
right, and every `'('` still open when the string ends is equally
stranded. The two debts are independent, and one left-to-right sweep
counts them both.

## Two counters, one sweep

Walk `s` once, keeping `opened`, the number of `'('` seen so far that no
`')'` has claimed. A `'('` raises it. A `')'` lowers it when it is
positive — the pair matched — and otherwise joins `insertions`: with
nothing open, no later character of `s` can ever pair with this `')'`, so
one inserted `'('` must appear before it. When the sweep ends,
`insertions` counts the stranded closing parentheses and `opened` the
stranded opening ones.

Both counts are forced, so their sum is a lower bound: any valid superstring
must supply a fresh `'('` before each stranded `')'` and a fresh `')'` after
each stranded `'('`. It is also achievable — insert exactly those
parentheses — so the sum is the answer. For `s = "())"` the second `')'`
finds nothing open and the answer is 1; for `s = "((("` three opens remain
and the answer is 3. Even at the constraint bound of 1000 characters the
answer sits far inside a 32-bit integer.

**Complexity:** `O(n)` time, `O(1)` space.
