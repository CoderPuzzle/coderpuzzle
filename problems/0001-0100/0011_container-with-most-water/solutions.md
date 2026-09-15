# Solutions — Container With Most Water

## Two pointers

The water between lines at `left` and `right` is `(right - left) * min(height[left], height[right])`: the width times the shorter of the two walls, since water above it would spill. Start with the widest possible container, one pointer at each end, and repeatedly move one pointer inward, recording the best area along the way.

Moving either pointer inward strictly shrinks the width, so a new pair can only beat the current best if its shorter wall is taller. Moving the taller wall inward can never help — the area stays capped by the shorter wall, which does not grow, while the width falls. Hence the taller wall's current pair is the best it can ever be part of, and it is safe to discard: the code always advances the pointer at the shorter wall (moving the right one on ties, which is equally correct since either wall caps the other).

Running the statement's first example, `height = [1,8,6,2,5,4,8,3,7]`, the walk is:

1. `left = 0, right = 8`: area = min(1, 7) x 8 = 8. The left line is the shorter one, so it is retired — every unmeasured pair keeping line 0 has width at most 7 and the same cap of 1.
2. `left = 1, right = 8`: area = min(8, 7) x 7 = 49, the new best. Now the right line (7 against 8) is shorter and retreats.
3. `left = 1, right = 7`: area = min(8, 3) x 6 = 18; the right pointer retreats again.
4. `left = 1, right = 6`: the walls tie at 8, area = 8 x 5 = 40, and the tie rule moves the right pointer.
5. The remaining pairs measure 16, 15, 4 and finally 6 as the pointers meet at indices 1 and 2 — nothing beats 49.

This argument is why nothing is missed: every pair that is abandoned is proven no better than a pair already measured, so the maximum is found by the time the pointers meet. The loop runs at most `n - 1` steps, each doing constant work, and only two integers of extra state are kept.

**Complexity:** `O(n)` time, `O(1)` space.
