# Solutions — Maximum Difference by Remapping a Digit

One remap rewrites every copy of a single digit, so the value space Bob
reaches from `num` is tiny: at most the hundred rewrites over digit pairs,
including the identity remap. The maximum and minimum of that set are
forced by position value — earlier digits dominate later ones regardless
of what happens behind them.

## Greedy promote-and-demote rewrites

The maximum promotes every copy of the **first digit that is not already
9** up to 9. Nothing else can do better: raising any other (later) digit
only inflates a less significant place, and when every digit is 9 no
promotion exists at all, in which case the allowed identity remap leaves
`num` itself as the maximum. The minimum is symmetric but even more rigid:
demoting every copy of the **leading digit** to 0 zeroes the most
significant place at once and, because one rewrite covers all its repeats,
costs nothing further. A different choice would leave some higher place
untouched at a strictly larger value — except for numbers whose leading
digit is already 0, which cannot occur since `num` has no leading zeroes.
Leading zeroes in the rewritten strings are legal per the notes and simply
shorten the parsed value, as example 1 shows (`11891` demotes to
`00890`, read as `890`).

Both rewritten strings keep at most nine digits, so parsing stays far
inside 32-bit range everywhere: the widest case `100000000` promotes to
`900000000`, still under 2³¹ − 1, and JavaScript's exact-Number bound 2⁵³
is never approached.

**Complexity:** `O(log₁₀ num)` time, `O(log₁₀ num)` space.
