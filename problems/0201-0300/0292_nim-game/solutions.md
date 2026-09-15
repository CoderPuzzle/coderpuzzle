# Solutions — Nim Game

## The losing multiples of four

Play out the smallest heaps. Facing 1, 2, or 3 stones you take them all and win. Facing exactly 4 you must leave 3, 2, or 1, and your friend sweeps what is left with the last stone — Example 1's three outcomes, all losses. So 4 is a loss for the player to move, and the classification propagates by induction in both directions: every heap that is not a multiple of 4 offers a move to one that is, and every move from a multiple of 4 lands on a heap that is not.

The winning play is the mirror. From any `n` with `n % 4 != 0` remove `n % 4` stones — always a legal 1 to 3 — and hand your friend a multiple of 4. Whatever `k` your friend then removes, answer with `4 - k`: each pair of turns burns exactly 4 stones, the heap your friend faces stays a multiple of 4 all the way down, and the friend is the one who finally faces 4 and must open it for you. The same argument run backwards is why a multiple of 4 is hopeless — every move you make breaks the multiple, and an optimal opponent restores it at once.

The method is the one expression `n % 4 != 0`, which answers the whole game without touching the heap. The constraint's ceiling `2³¹ - 1` is itself 3 modulo 4, so the largest heap the statement allows is a win, and since `n` arrives positive the modulo never sees a negative operand. A simulation or memoized game search derives the same classification — the losing positions are exactly the multiples of 4 — but the residue alone decides every heap up to the cap.

**Complexity:** `O(1)` time, `O(1)` space.
