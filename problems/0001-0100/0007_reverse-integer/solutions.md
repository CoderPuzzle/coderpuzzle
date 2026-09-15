# Solutions — Reverse Integer

## Pop digits, clamp before the push

Reversal proceeds digit by digit: each iteration pops the last digit of `x` with a remainder, drops it
from `x` with a division, and pushes it onto `rev` as `rev * 10 + pop`. The whole difficulty of the
problem lives in that push. The statement forbids storing 64-bit integers, so an overflow cannot be
allowed to happen and be repaired afterwards — the moment `rev * 10 + pop` leaves the signed 32-bit
range, the value is already unrepresentable. The clamp therefore has to fire while `rev` is still
provably inside it.

So before every push the code compares `rev` against the two boundary quotients, `2147483647 / 10`
and `-2147483648 / 10`. Strictly beyond either quotient, any further digit overflows; exactly on a
quotient, the outcome hinges on the final digit alone, and since the limits end in 7 and -8 the
deciding tests are `pop > 7` and `pop < -8`. Overflow in either direction returns 0, exactly the
statement's rule.

In C++, Java, Rust, Go, and JavaScript integer division truncates toward zero, so the popped digit
carries the sign of `x` — `-123` pops `-3`, `-2`, `-1` and builds `-321` — and one signed loop serves
both directions. Python's floor division would pop `7` from `-123`, so there the magnitude is
reversed with the sign detached and reattached at the end: same digits, same clamp, same answers.
Trailing zeros need no special case — `120` pushes `0` into a fresh `rev`, then `2`, then `1`.

**Complexity:** `O(d)` time for `d` digits — at most ten pops for a 32-bit input — and `O(1)` space.
