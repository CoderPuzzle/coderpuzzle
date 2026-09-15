# Solutions — Counting Bits

One linear-time recurrence that reuses smaller answers, and one baseline
that popcounts every number on its own — the follow-up's `O(n log n)` easel
against its `O(n)` target.

## dp_lowest_bit

The popcount of `i` can be derived from a strictly smaller index that is already computed: `i & (i - 1)` clears `i`'s lowest set bit, and clearing a set bit removes exactly one 1-bit, so `ans[i & (i - 1)]` is the count of 1-bits in everything except that lowest one. Adding 1 back gives `ans[i] = ans[i & (i - 1)] + 1`. Since `i & (i - 1) < i` for every `i >= 1`, filling the array in ascending order guarantees the needed value is always ready, turning the whole computation into one linear pass with a single AND, a lookup, and an increment per slot.

The recurrence works uniformly for evens and odds — no parity case split — because the cleared bit is always exactly the lowest set one, whatever its position. The only edge case is `n = 0`, handled by `ans[0] = 0` and a loop that never runs, returning `[0]`.

**Complexity:** `O(n)` time, `O(n)` space for the output array (`O(1)` extra).

## kernighan

The direct baseline: compute each popcount from scratch with Brian Kernighan's identity. `value & (value - 1)` knocks out the lowest set bit of `value` in a single AND, so an inner loop of those clearings — counting one per iteration — terminates after exactly `popcount(value)` iterations, never 31: a power of two costs one pass, `2^31 - 1` costs thirty-one.

Each output slot is independent, which is the approach's one structural advantage (it would parallelize or stream), but the total work is the sum of popcounts over `0..n` — about `n·(log n)/2` ANDs — an `O(n log n)` budget the dp variant beats by reusing the answer already sitting in the array at index `i & (i - 1)`.

**Complexity:** `O(n log n)` time, `O(n)` space for the output array (`O(1)` extra).
