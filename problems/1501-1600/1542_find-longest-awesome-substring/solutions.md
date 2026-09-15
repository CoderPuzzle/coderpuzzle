# Solutions — Find Longest Awesome Substring

## Bitmask prefix parity with an earliest-index hash map

A substring can be rearranged into a palindrome exactly when at most one of
its digits has an odd count — every other digit must pair up on the two
sides of the palindrome, leaving room for at most one unpaired digit to sit
in the middle. So the whole problem reduces to comparing digit-count
parities between two positions, not the counts themselves, which is exactly
what a 10-bit mask captures: bit `d` of `mask` is the parity (even/odd) of
how many times digit `d` has appeared in the prefix scanned so far, updated
in O(1) per character with `mask ^= 1 << digit`.

For a substring `s[i+1..j]` to be awesome, its digit-count parities must
have at most one 1 bit, which is precisely `mask[j] XOR mask[i]`: XOR-ing
two prefix masks cancels every digit whose parity agrees between the two
prefixes and leaves a 1 bit for every digit whose parity differs. That
target is either `0` (the same mask reappearing, meaning every digit is
already even) or a single power of two (mask differing from an earlier
prefix in exactly one bit, the one odd digit that becomes the palindrome's
middle character). A hash map from mask to the smallest index where it was
first seen lets each new position `j` look up both cases directly: the
current mask itself, and the current mask XORed with each of the ten
single-bit digit flags, taking the widest span found among all matches (and
against the sentinel empty-prefix mask 0 at index -1, covering substrings
that start at index 0).

Each position does O(1) mask work plus a fixed 10-entry lookup, and the map
holds at most 1024 distinct masks, so the whole scan stays linear in the
length of `s`.

**Complexity:** `O(n)` time, `O(1)` space (at most 1024 masks in the map).
