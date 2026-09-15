# Solutions — Minimum Number of Changes to Make Binary String Beautiful

Any beautiful string splits into even-length parts that are all one symbol,
and every such part of length `2t` further splits into `t` uniform
length-2 blocks. So a string is beautiful exactly when it can be cut into
uniform pairs, and minimizing changes over arbitrary even partitions
reduces to the fixed cut into aligned pairs at positions `(0, 1), (2, 3), …`.

## Count misaligned pairs

Each aligned pair that already holds equal characters costs nothing, and
each mixed pair costs exactly one change — flip one of its two characters,
which never helps a neighboring pair because the cut lines are fixed.
Counting pairs with `s[i] != s[i + 1]` on even `i` is therefore both
achievable and optimal. One pass, constant space.

**Complexity:** `O(n)` time, `O(1)` space.
