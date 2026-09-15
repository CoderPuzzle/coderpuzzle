# Solutions — Find Players With Zero or One Losses

## One loss counter per player, then two sorted buckets

Only each player's loss count matters — winners never lose standing by
winning. A single pass over matches maintains one map entry per player,
seeded at 0 when a player first appears (as winner or loser) and incremented
whenever they appear on the losing side. Every player who played at least
one match ends up with an exact loss total, so the two answer lists are just
the players whose count is 0 and whose count is 1, each collected and then
sorted ascending.

The pass is `O(m)` for m matches plus `O(p log p)` to sort the p players in
each output bucket — comfortably within limits for `10⁵` matches. The
"unique match outcomes" guarantee only means no duplicate pair appears; it
places no restriction on how many times a given loser loses, so counting
(rather than set membership) is what distinguishes "lost once" from "lost
twice".

**Complexity:** `O(m + p log p)` time, `O(p)` space.
