# Solutions — Maximum Bitwise XOR After Rearrangement

## Count-guided greedy fill

Position i of the XOR is 1 exactly when the arrangement of `t` places the
opposite bit of `s[i]` there, and since `t` may be rearranged freely, only
the counts of its characters matter. Let `a` be the number of `t`'s ones
that land on `s`'s '0' positions and `b` the number of `t`'s zeros that
land on `s`'s '1' positions; every other position is forced to match and
contributes 0. No arrangement gets more opposite-bit pairings than
`a = min(ones(t), zeros(s))` and `b = min(zeros(t), ones(s))`, and taking
both maxima at once is consistent: shifting one unit of `t`'s ones from an
s-'1' position to an s-'0' position also frees a zero of `t` for an s-'1'
position, so the two budgets only ever move up together.

With the budgets fixed, the value is maximized by putting the XOR ones as
far left as possible. Walk `s` left to right holding the two budgets and
spend one whenever the current position's class still has some left — an
exchange argument settles this: among arrangements with the same budgets,
any two answers first differ where one has a 1 and the other a 0, and the
one with the earlier 1 is the larger integer. The result is not always
`1` repeated `a + b` times: a budget can run dry mid-string while the
other class still has positions left, so the fill must follow `s`'s actual
bit pattern — for `s = "010"` and `t = "111"` the only arrangement gives
`"101"`, not `"110"`.

Counting `s` and `t` takes one scan each, the fill one more, and building
the answer dominates space.

**Complexity:** `O(n)` time, `O(n)` space.
