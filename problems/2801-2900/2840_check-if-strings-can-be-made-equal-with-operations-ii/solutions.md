# Solutions — Check if Strings Can be Made Equal With Operations II

## Per-parity character counts

The operation never moves a character across the parity boundary: indices `i`
and `j` with an even difference always share the same parity, so a swap only
rearranges characters among even positions or among odd positions. Within one
parity class those swaps are unrestricted — every pair of positions in the
class is directly swappable — so each class can be permuted into any
arrangement at all, independently of the other class.

That collapses the question to counting. The strings can be made equal exactly
when, restricted to even positions, `s1` and `s2` hold the same multiset of
characters, and likewise for odd positions. One pass over both strings with two
26-slot count arrays settles it: add up what each parity class of `s1` holds,
subtract what `s2` needs class by class, and report `false` the moment some
counter goes negative — that means `s2`'s class asks for a copy of a character
that `s1`'s matching class cannot supply. A swap of letters between the two
parity classes leaves the overall letter counts untouched yet breaks both
classes, which is why comparing whole-string counts alone is not enough and
the per-class bookkeeping is doing real work. Equal lengths make the classes
line up by construction, so no length guard is needed.

**Complexity:** `O(n)` time, `O(1)` space.
