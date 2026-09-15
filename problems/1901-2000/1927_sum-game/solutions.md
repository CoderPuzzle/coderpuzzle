# Solutions — Sum Game

## Half-Sum Difference Game

Only the difference between the half-sums ever matters. Let `diff` be the left
digit sum minus the right digit sum over the fixed digits, and let `k` be
(question marks on the left) − (question marks on the right). Watch the
quantity `f = 2·diff + 9·k`: filling a left slot with digit `d` adds `2d − 9`
to `f`, and filling a right slot with digit `e` adds `9 − 2e` — both cover
exactly the odd offsets in `[−9, +9]`, so which side a slot sits on becomes
irrelevant. The claim proved below: **Alice wins iff `f ≠ 0`**, checked in one
linear pass.

If `f ≠ 0` (say `f > 0`; negation is symmetric), Alice spends every turn
raising `f` by the maximal `+9` — put `9` in a left slot or `0` in a right
slot, whichever still exists — while no Bob reply can lower `f` by more than
`9`. Each Alice–Bob round thus leaves `f` no smaller, and because `f` ends as
`2·diff` once every slot is filled, the final difference keeps the strict sign
of `f`: the sums stay unequal and Alice wins.

If `f = 0`, then `k` is even (their parities match). Whenever Alice's move
shifts `f` by an odd amount `s` with `|s| <= 9`, Bob answers through any
remaining slot with the shift `−s`, restoring `f = 0` with two fewer slots
free. Induction carries the position to zero slots with `f = 2·diff = 0`, so
the sums are equal and Bob wins. All quantities are bounded by roughly
`9·10⁵`, far inside 32-bit range and JS exact-integer territory.

**Complexity:** `O(n)` time, `O(1)` space.
