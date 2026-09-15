# Solutions — Is Subsequence

## Two pointers, greedy advance

Walk `t` once while holding a pointer into `s`: every character of `t` that
equals the character under the pointer advances it, everything else is
skipped. The answer is `true` exactly when the pointer runs off the end of
`s` — every character was found, in order, with only deletions in between. One
pass, and no state beyond the pointer.

The greedy rule — match each character of `s` at its earliest legal position
in `t` — never hurts, and an exchange argument shows why: if a valid embedding
matches some `s[i]` at a later position, moving that match up to the greedy
spot leaves strictly more room for `s[i + 1]` and everything after it, so no
matchable input becomes unmatchable. The order trap (`"aec"` inside
`"abcde"`) needs no special handling: the pointer stalls on `c` because every
`c` sits before the already-matched `e`, and the walk ends short of the end.

The follow-up scenario — many incoming `s` checked against one fixed `t` —
inverts the work: preprocess `t` once into per-letter sorted position lists,
then answer each `s` by binary-searching, character by character, for the next
legal position after the previous match. That trades the linear scan for
`O(|s| log |t|)` per query after `O(|t|)` of one-time setup.

**Complexity:** `O(|t|)` time, `O(1)` space.
