# Solutions — Max Consecutive Ones II

## Sliding window with at most one zero

Flipping a 0 turns it into a 1 for free, so a stretch of the array can be made
all-ones exactly when it contains no more than one 0 — the flip repairs that
single gap. The answer is therefore the longest window holding at most one
zero, and the two-pointer sweep finds it: the window grows one element at a
time on the right, and the moment a second 0 slips in, the left edge advances
until the earlier 0 falls out and the one-flip budget is restored. The largest
window seen along the way is the maximum run of consecutive 1s after the best
flip.

Both pointers only ever move forward — each element enters the window once and
leaves at most once — so the sweep is linear. It keeps nothing but three
counters, which answers the Follow-up: fed as an infinite stream, the same
two pointers still work, since they keep only counts and never revisit a
dropped element, so a streaming pass needs no stored array at all.

**Complexity:** `O(n)` time, `O(1)` space.
