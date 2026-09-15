# Solutions — Check Digitorial Permutation

The sum of the factorials of the digits does not depend on digit order, so
`n` and every one of its permutations share a single factorial digit sum `s`.
A digitorial permutation `p` of `n` must satisfy `p` = its own factorial digit
sum, which is also `s` — so `p = s`, and `p` reuses exactly the digits of `n`.
Conversely, when `s` happens to use exactly the digits of `n`, then `s` itself
is a valid arrangement of them (its written form never starts with zero, since
`s >= 1` whenever `n >= 1`) and it equals its own factorial digit sum. The
whole question collapses to one digit-multiset comparison.

## Factorial Sum Multiset

A ten-entry table holds `0!` through `9!`, and one pass over the decimal
digits of `n` accumulates `s`, their factorial sum; with `n <= 10⁹` there are
at most ten digits, so `s <= 10 × 9! = 3,628,800`. The answer is true exactly
when the digits of `s`, sorted, equal the digits of `n`, sorted. That check
accepts `145` and each of its rearrangements, and every number whose digits
are those of `40585`; it rejects `10`, whose sum `2` matches neither the `1`
nor the `0` — matching the rule that an arrangement starting with zero, like
`01`, is invalid anyway.

Every value in play — `n` up to `10⁹`, factorials up to `9! = 362,880`, and
`s` up to `3,628,800` — sits well inside 32-bit range, so Java and C++ `int`,
Go `int`, and Rust `i32` carry everything without overflow, while in
JavaScript and TypeScript each value is far below the `2⁵³` exact-integer
range of a `Number`, so plain arithmetic is exact there too. The work is one
digit scan plus sorting two strings of at most ten characters — iterative,
with no recursion and no structure beyond the digit strings themselves.

**Complexity:** `O(d log d)` time, `O(d)` space, for `d <= 10` digits.
