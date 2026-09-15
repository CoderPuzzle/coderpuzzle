# Solutions — Long Pressed Name

A long press never introduces a new character and never reorders the typed
ones — it only stretches a character of `name` into a run of copies of
itself. So `typed` is a possible transcription of `name` exactly when the two
strings compress to the same sequence of runs and, run by run, `typed` is at
least as long as `name`. Deciding that needs one pass with two indices and
nothing stored.

## Two pointers over the runs

Advance one pointer through `name` and one through `typed`. When the next
typed character equals the next wanted character of `name`, both pointers
advance — that typed character realizes one character of the name. When they
differ, the typed character is admissible only as a long press: it must equal
its own predecessor in `typed`, and just the typed pointer advances. A typed
character that neither matches the next wanted one nor repeats the previous
one cannot appear in any transcription, so the scan stops with `false`; the
same holds if `typed` runs out while `name` still has characters waiting.

Conversely, everything the scan accepts is a genuine transcription. The
matched pairs line the i-th run of `typed` up with the i-th run of `name`,
and every skipped repetition merely lengthens the run its matched character
sits in, so run by run the characters agree and the typed run is at least as
long — precisely some characters (possibly none) being long pressed. For
`name = "saeed"` the `e` run of `"ssaaedd"` falls short of two, and the scan
rejects it as soon as the second `d` matches nothing. Both pointers only move
forward, so each character is touched once and nothing beyond the two indices
is kept.

**Complexity:** `O(n + m)` time, `O(1)` space.
