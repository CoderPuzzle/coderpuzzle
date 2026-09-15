# Solutions — Check If Digits Are Equal in String After Operations I

Every operation shortens the digit string by exactly one, so a string of
length `n` reaches length 2 after `n - 2` rounds. With `n <= 100` the entire
cascade costs at most `100 + 99 + ... + 3` single-digit additions — a few
thousand operations — which makes plain simulation the natural tool.

## Direct simulation

Keep the digits as an integer list and rewrite it in place: each pass
replaces `d[i]` with `(d[i] + d[i+1]) % 10` for every adjacent pair, and the
usable prefix shrinks by one. After `n - 2` passes exactly two entries
remain, and the answer is simply whether they are equal.

The rewrite needs no second buffer — writing `d[i]` before reading
`d[i+1]` in the same left-to-right sweep is safe because position `i` never
feeds a pair that is computed later in that same pass; each pass consumes
only the values still ahead of the write cursor. The Python variant instead
builds each shorter list from `zip(digits, digits[1:])`, which states the
"consecutive pairs" rule most literally.

**Complexity:** `O(n²)` time, `O(n)` space, where `n` is `s.length` (at most
`100`, so at most ~5000 digit additions).
