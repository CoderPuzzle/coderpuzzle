# Solutions — Expressive Words

The extension operation never adds, removes, merges, or reorders groups —
it only grows one — so a word can be turned into `s` exactly when both
strings break into the same sequence of maximal letter groups and each of
the word's groups can grow to `s`'s size. The whole problem is therefore a
run-length comparison: encode `s` once, then walk every word's own groups
against that encoding.

## Run-Length Group Walk

Encode `s` as its list of `(letter, count)` groups. A query word is
stretchy iff its groups line up with that encoding one for one — same
letters, same number of groups — and, group by group, either the counts
already agree or `s`'s count is at least 3 and strictly larger. Those are
exactly the sizes the operation can reach: one extension takes a group of
size `w` to any size that is three or more and strictly above `w`, and
zero extensions leaves `w` alone. So a group of `s` with size 1 or 2 can
only be matched by an equal word group (nothing grows to 2), and a word
group larger than `s`'s can never shrink down to it.

Each word is scanned once with a run-length loop, advancing through `s`'s
encoding as its groups are consumed; the word counts exactly when the walk
ends in lockstep with the encoding, leaving no unconsumed groups on either
side. Here `S` is the length of `s` and `W` is the total number of
characters across `words`.

**Complexity:** `O(S + W)` time, `O(S)` space.
