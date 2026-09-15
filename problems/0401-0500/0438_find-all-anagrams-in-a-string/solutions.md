# Solutions — Find All Anagrams in a String

## Sliding Window with a Mismatch Counter

A window of length `len(p)` is an anagram of `p` exactly when its character counts equal `p`'s counts. Rather than comparing 26-slot count arrays at every position, the code keeps a single `delta` array — `need[c] - window[c]` — and a scalar `diff` counting how many letters currently have a nonzero delta. The window is an anagram precisely when `diff == 0`, so each step reduces the anagram test to one integer comparison.

The window slides one character per iteration over `s`. For the entering character, `delta[c]` is decremented, with `diff` adjusted around the change: it increases when a letter moves onto a nonzero delta and decreases when one lands exactly on zero (a need just satisfied or over-satisfied cancelling out). Once the window has grown past length `len(p)`, the leaving character `s[i - length]` is processed symmetrically with an increment. Recording happens whenever `i >= length - 1` and `diff == 0`, emitting the start index `i - length + 1`.

Initializing `delta` from `p` alone means the first `length - 1` steps only add characters and can never match; the first candidate window completes at index `length - 1`. If `s` is shorter than `p` the function returns immediately, and characters absent from `p` are handled naturally — their slot goes negative, contributing to `diff` until they slide out.

Both the add and remove branches do constant work per character, so the whole sweep is a single linear pass independent of alphabet comparisons.

**Complexity:** `O(n)` time where n is `len(s)`, `O(1)` space (fixed 128-entry delta array and a few scalars).
