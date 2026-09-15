# Solutions — Robot Return to Origin

## Balance the two axes in one sweep

The four moves pair off into opposites, and the pairs live on separate
axes: `U` and `D` push along the vertical axis, `L` and `R` along the
horizontal one. Movement on one axis can never cancel movement on the
other, so the plane question reduces to two independent line questions
that can be settled separately. The robot stands at the origin again
exactly when both settle at zero — a leftover on either axis is a
displacement nothing on the other axis repairs.

One sweep with two counters settles them. `vertical` rises on `U` and
falls on `D`; `horizontal` rises on `R` and falls on `L`. Because
addition commutes, the order of the moves never matters to the final
position — `"UD"`, `"DU"` and every interleaving of the two land on zero
— so no second pass or lookahead is needed, and the verdict is the
conjunction `vertical == 0 and horizontal == 0` once the sweep ends.

The two counters watch the failures separately. `"LL"` finishes with the
horizontal counter at `-2` and fails while the vertical one sits
untouched at zero; `"UL"` ends one step up and one step left of home
with both counters off; and a long alternation of `U` with `D` cancels
exactly however far the robot wandered. The robot may travel a great
distance and still finish where it started — only the final balances
decide.

**Complexity:** `O(n)` time, `O(1)` space.
