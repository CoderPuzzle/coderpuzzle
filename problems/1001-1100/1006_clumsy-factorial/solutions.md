# Solutions — Clumsy Factorial

## Stack of signed multiplicative chains

Multiplication and division bind tighter than addition and subtraction, so
the rotating `*` `/` `+` `-` sequence never actually mixes across a `+` or
`-`: every run of consecutive `*` and `/` steps folds into one term, and
each `+` or `-` simply starts the next term. A stack captures that
directly. Seed it with `n`, then walk the remaining numbers from `n - 1`
down to `1`, applying the next operator in the fixed rotation to each:
`*` and `/` fold the number into whatever sits on top of the stack, while
`+` pushes the number as a brand-new entry and `-` pushes its negation as
a brand-new entry. Once every number is consumed, each stack entry already
carries the sign its term contributes, so summing the stack is the answer.

The one subtlety is division. A `-` push can leave a negative value on top
of the stack, and the very next operator in the rotation is always `*`,
which can go on to multiply that negative top by another number before a
`/` divides it — so the value being divided is not always positive.
Multiplication distributes across that sign exactly (`(-a) * b` is exactly
`-(a * b)`), but the division after it must truncate toward zero rather
than floor, or the sign would drag the quotient a step too far negative:
`-(a * b) / c` truncated toward zero equals `-(a * b / c)` with ordinary
floor division on the positive `a * b` and `c`, which is what the fixed
rotation actually means once the sign is factored back out. That is
exactly the integer division every language but Python performs by
default, so only the Python solution needs an explicit adjustment; every
other language's native `/` already truncates toward zero.

**Complexity:** `O(n)` time and `O(n)` space for the stack.
