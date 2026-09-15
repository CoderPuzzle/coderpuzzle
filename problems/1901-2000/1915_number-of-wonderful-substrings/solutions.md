# Solutions — Number of Wonderful Substrings

## Prefix Parity Bitmasks

A substring is wonderful when at most one letter occurs an odd number of times in it. Parities are all that matter, and since the alphabet is limited to the ten letters 'a' through 'j', the parity vector of any prefix fits in a 10-bit mask. A substring bounded by prefixes with masks `P` (before it) and `Q` (after it) has parity vector `P XOR Q`, so it is wonderful exactly when `P == Q` (all letters even) or `P XOR Q` has a single bit set (exactly one odd letter). Counting wonderful substrings becomes counting previously seen prefix masks that are equal to the current mask or one bit-flip away.

The algorithm sweeps the string once, maintaining the running mask in `mask` and a `count` table of size 1024 indexed by mask, seeded with `count[0] = 1` for the empty prefix. At each character it toggles the character's bit, adds `count[mask]` (substrings whose two boundary masks are identical), then adds `count[mask ^ (1 << b)]` for each of the ten possible single-bit differences, and only afterwards increments `count[mask]` — the delay guarantees every counted pair uses an earlier prefix, so each substring is counted exactly once.

Seeding with the empty prefix is what makes substrings starting at index 0 count, and the ten-letters bound is what keeps the inner loop constant-sized rather than another pass over the alphabet. The total can exceed 32-bit range for long inputs, which Python integers absorb without any special handling.

**Complexity:** `O(10·n)` time, `O(2^10)` space.
