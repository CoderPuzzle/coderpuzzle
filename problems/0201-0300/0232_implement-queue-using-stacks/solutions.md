# Solutions — Implement Queue using Stacks

## Two stacks, transferred lazily

The queue lives in two stacks with a division of labor: `in` receives every push on its top, and `out` serves the front from its top. A stack alone cannot hand back the oldest element, so the first `pop` or `peek` that finds `out` empty pops everything off `in`, one element at a time, pushing each onto `out`. The double reversal cancels — the element that sat at the bottom of `in`, the oldest, ends up on top of `out` — and once `out` is loaded, the front is just its top.

With the out stack loaded, `pop` and `peek` are single stack operations and `empty` asks whether both piles are dry. Pushes never wait on anything already queued: each lands on `in` in constant time no matter how many elements sit ahead of it.

The transfer is what makes every operation amortized `O(1)`, answering the follow-up. An element crosses from `in` to `out` at most once in its lifetime — after the crossing nothing ever moves it again, and the refill only happens when `out` has been fully drained, so elements already in `out` keep their order ahead of every newcomer. A `pop` that costs `O(k)` after `k` cheap pushes is those pushes paying their dues in one lump: over any `n` operations the total work is `O(n)`.

**Complexity:** every operation amortized `O(1)` (a single `pop`/`peek` worst-case `O(n)` over the `n` stored elements); `O(n)` space.
