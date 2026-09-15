# Solutions — Valid Anagram

## Letter counts

An anagram is a rearrangement: `t` must contain exactly the letters of `s`, each one the same number of times. That is a multiset comparison, and the constraints shrink the universe to the 26 lowercase English letters, so the whole multiset fits in 26 integer counters — one slot per letter. A length guard up front settles any pair that could not possibly match, since rearranging never changes length.

One pass walks the two strings in lockstep and feeds both at once: each letter of `s` adds 1 to its slot, each letter of `t` subtracts 1. When the strings are anagrams every letter cancels back to zero, so the answer is whether the whole table returned to zero; a nonzero slot is a letter the two strings disagree on, in one direction or the other.

Because the alphabet is fixed at 26, the counter table stays constant size no matter how long the strings grow — the same job done with a hash map would have no such guarantee, and no sorting step is needed at all. That trade is exactly what the follow-up flips: with Unicode input the alphabet is effectively unbounded, so the fixed array gives way to a hash map keyed by character, while the increment-and-cancel logic carries over unchanged.

**Complexity:** `O(n)` time, `O(1)` space.
