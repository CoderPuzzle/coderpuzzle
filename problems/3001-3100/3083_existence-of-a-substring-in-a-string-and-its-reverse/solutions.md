# Solutions — Existence of a Substring in a String and Its Reverse

## One pass over reversed pairs

Reading `s` backwards turns every adjacent pair `xy` into `yx`, so a
length-2 substring of `s` appears in `reverse(s)` exactly when its own
reversal appears somewhere in `s` itself. The question "is any piece of `s`
hidden in the reverse of `s`" therefore never needs the reversed string
built: it only asks whether some adjacent pair of `s` repeats elsewhere in
`s` with its two letters swapped.

One pass answers that with a hash set. Walking left to right, each adjacent
pair is looked up flipped before it is recorded — a hit on `yx` means an
earlier `xy` mirrors into it, and a later `yx` is found the same way by the
`xy` recorded before it. Doubled letters need no partner at all: `xx` is
its own reversal, so the first `ee` of `leetcode` matches the moment it
appears, and the scan returns the instant any hit is found.

The set never grows past the alphabet: there are only 26 × 26 possible
pairs, so it holds at most 676 entries regardless of how long `s` is, and
the whole check is a single linear sweep.

**Complexity:** `O(n)` time, `O(1)` space.
