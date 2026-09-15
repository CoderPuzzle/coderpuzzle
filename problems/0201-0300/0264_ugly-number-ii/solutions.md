# Solutions — Ugly Number II

Two ordered generators over the same recurrence; one merges three
virtual lists with cursors, the other expands a frontier through a
min-heap.

## three_pointers

Every ugly number except 1 is a smaller ugly number multiplied by 2, 3, or 5. That self-referential structure means the sequence can be _generated_ in order rather than searched for: it is exactly `{1} ∪ {2·U} ∪ {3·U} ∪ {5·U}`, i.e. the merge of three sorted lists, each derived from the sequence built so far. There is no need to test arbitrary integers for ugliness, which would waste almost all the work.

The dp array is filled left to right, with three cursors `i2`, `i3`, `i5` into it. At each step the candidates are `ugly[i2]*2`, `ugly[i3]*3`, `ugly[i5]*5` — the smallest not-yet-emitted element of each virtual list — and the next ugly number is the minimum of the three. Every cursor whose candidate equals the minimum is then advanced, not just one of them: a value like 6 is reachable as both 2·3 and 3·2, and advancing all matching cursors keeps it from appearing twice. The cursors never lag because a candidate can only be consumed once it has become the minimum.

Generating the first entries for the statement's Example 1 (`n = 10`):

1. `ugly = [1]`, all three cursors at index 0; the candidates are 2, 3, and 5.
2. 2 wins: `ugly[1] = 2`, and only `i2` advances.
3. Candidates 4, 3, 5: 3 wins (`ugly[2] = 3`), then 4 wins on the next round (`ugly[3] = 4`).
4. Candidates 6, 6, 5: 5 wins (`ugly[4] = 5`) and `i5` advances.
5. Candidates 6, 6, 10 again: both `i2` and `i3` advance, emitting 6 exactly once — the dual advance that suppresses duplicates.
6. The scan continues through 8 = 2·4, 9 = 3·3, and 10 = 2·5 = 5·2 (another dual advance), and the 10th ugly number is 12 = 2·6 = 3·4.

Starting from `ugly[0] = 1`, each of the `n` slots costs three multiplications, three comparisons, and a few increments, and the answer is the last slot filled (`ugly[n - 1]`, since the array is written with a leading 1). The table of `n + 1` values is the entire footprint; n ≤ 1690 keeps it tiny.

**Complexity:** `O(n)` time, `O(n)` space.

## heap

The same generation viewed as best-first expansion: keep a min-heap holding the frontier of ugly numbers not yet emitted, seeded with 1, and repeat n − 1 times — pop the smallest, push each of `2·v`, `3·v`, `5·v` that has not been seen. The heap invariant makes every pop the next ugly number in order, so after n − 1 pops the heap's top is the answer.

The `seen` set is what keeps the frontier a set rather than a multiset: 6 is reachable as both 2·3 and 3·2, and gating pushes on first sight emits each ugly number exactly once. The heap stays small — each round replaces one element with at most three, so after 1690 rounds it holds a few thousand entries — and the `O(log k)` sift cost per push makes the total `O(n log n)`. The fixed-width ports keep 64-bit heap elements: pushed multiples routinely overshoot the 32-bit answer on their way to being popped, which is also why the dedupe set is keyed on the full 64-bit value.

**Complexity:** `O(n log n)` time, `O(n)` space.
