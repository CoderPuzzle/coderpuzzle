# Solutions — Decode String

## Stack of frames

Nesting is the whole difficulty of `k[encoded_string]`: while decoding an inner group, the partially built outer string and its pending repeat count must be remembered and later resumed. A stack of `(previous_string, repeat_count)` frames mirrors the bracket structure exactly — one frame per unclosed `[` — so the scan never loses context no matter how deep the nesting goes.

The walk processes each character by kind. Digits accumulate into `repeat` with `repeat = repeat * 10 + int(ch)`, which correctly assembles multi-digit counts like `12[ab]`. On `[`, the current segment and its count are pushed and both accumulators reset for the fresh inner segment. On `]`, the top frame is popped and the finished inner segment is repeated and appended to the restored outer segment: `current = previous + current * times`. Plain letters simply append to the current segment. When the scan ends, every bracket has been closed, so the stack is empty and `current` is the fully decoded string.

Tracing Example 2, `s = "3[a2[c]]"`, shows the frames at work:

1. `3` accumulates into `repeat = 3`.
2. `[` pushes the frame `("", 3)` and resets both accumulators for the inner segment.
3. `a` builds `current = "a"`; then `2` sets `repeat = 2`, and the second `[` pushes `("a", 2)` and resets again.
4. `c` builds `current = "c"`; the first `]` pops `("a", 2)` and sets `current = "a" + "c" * 2 = "acc"`.
5. The final `]` pops `("", 3)` and sets `current = "" + "acc" * 3 = "accaccacc"` — the decoded output.

Nothing is ever discarded — each frame's segment is absorbed wholesale into its parent — so the total character-copies performed are bounded by the decoded length times the nesting depth, which the input's small size (at most 30 characters) keeps shallow. Edge cases are guaranteed away by the problem statement (well-formed brackets, no bare digits or stray letters outside groups), so the loop needs no error handling.

**Complexity:** `O(n + m)` time (where `n` is the input length and `m` the decoded output length), `O(n + m)` space.
