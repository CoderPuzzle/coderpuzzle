# Solutions — Reformat Phone Number

The separators are noise: dashes and spaces can land anywhere, so the only
things the rules can possibly consult are the digit sequence itself and how
many digits remain — never where the original dashes sat. Strip everything
that is not a digit and the problem collapses to grouping one clean string by
length alone.

## Strip, then group by remaining length

Walk the cleaned digits left to right asking one question at each step: how
many digits are left? While more than 4 remain, cut a block of 3 — the cut is
always safe because 5 or more digits minus 3 still leaves at least 2, so the
loop can never strand a lone digit. Once 4 or fewer remain the tail is forced
by the rules: 2 digits stay as one block of 2, 3 digits as one block of 3,
and 4 digits split into two blocks of 2. Collect the blocks in a list and join
them with dashes at the end, exactly as the second hint's while loop suggests.

The join explains the guarantee the statement points out. Every 3-block comes
from the loop and every block has length 2 or 3, so no block of length 1 is
ever produced; and since the tail contributes at most two 2-blocks while the
loop emits only 3-blocks, the whole output holds at most two blocks of length 2. One pass strips the input, a second pass groups it, and the output string
is materialized once by the join — the builder appends are amortized constant,
and the output is within a small constant of the input's length.

**Complexity:** `O(n)` time, `O(n)` space (output).
