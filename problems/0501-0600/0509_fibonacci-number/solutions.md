# Solutions — Fibonacci Number

## Two rolling variables

The recurrence defines every term from the two before it: `F(0) = 0`,
`F(1) = 1`, and `F(n) = F(n - 1) + F(n - 2)` for `n > 1`. Computing `F(n)`
therefore needs only the walk up the sequence from the two seeds — the value
at index `n` is reached after `n - 1` applications of the rule.

The loop keeps exactly the two values the next step reads, `previous` and
`current`, and rolls the pair forward: it becomes
`(current, previous + current)`. The two base cases never enter the loop — an
`n` of 0 or 1 is returned directly — and once the loop has run `n - 1` times,
`current` holds `F(n)`. For the examples: `n = 2` stops after one roll on 1,
`n = 3` after two rolls on 2, and `n = 4` after three rolls on 3.

Nothing is tabulated, because no earlier value is ever read again — a full
array would only restate what the pair already carries. The domain ceiling
keeps the arithmetic small too: `F(30) = 832040`, well inside 32-bit range,
so plain integer addition carries every case.

**Complexity:** `O(n)` time, `O(1)` space.
