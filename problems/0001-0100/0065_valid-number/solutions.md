# Solutions — Valid Number

## One-pass state machine

The statement's grammar gives every valid string the same skeleton: an optional sign, then a mantissa that is either an integer or a decimal, then an optional exponent that is itself a signed integer. A single left-to-right scan checks that skeleton with three flags — `seen_digit`, `seen_dot`, and `seen_exp` — where `seen_digit` is scoped to the part currently being read: the mantissa first, and once an `'e'`/`'E'` appears it is reset so the exponent must show a digit of its own.

Each character class advances exactly one concern. Digits only set `seen_digit`. A `'.'` is accepted once and only before the exponent, since the exponent part is an integer — that rejects `"99e2.5"` and `"1.2.3"` while admitting `"4."` and `"-.9"`. An `'e'`/`'E'` is accepted at most once, only after the mantissa has shown a digit, which kills `"e3"` outright. A sign is legal in exactly two positions, the very start or immediately after the exponent marker, enforced by looking at the previous character; `"--6"`, `"-+3"`, and a sign after a digit like `"6+1"` never survive it. Any other character — every letter but `e`/`E` — returns false on sight, which is what rejects hex-looking strings such as `"0x1F"` alongside `"abc"` and `"95a54e53"`.

The method returns `seen_digit`: the last part read must have contained at least one digit. That single return handles all the ways the grammar can come up empty — a lone sign, a lone dot, or an exponent with no digits all end the scan with `seen_digit` false, so `"+"`, `"."`, and `"1e"` are false while `"0"`, `"+6e-1"`, and `"4."` are true. Digits are recognized by the ASCII range `'0'`–`'9'` rather than the languages' broader digit classifiers, matching the constraints' `0-9`.

**Complexity:** `O(n)` time, `O(1)` space.
