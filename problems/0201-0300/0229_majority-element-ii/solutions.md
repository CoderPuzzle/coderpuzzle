# Solutions — Majority Element II

Both approaches make one scan over `nums`, end by sorting the one-or-two
survivors into the ascending order the statement asks for, and owe the scan
its shortness to the same fact: at most two values can occur more than
`⌊n/3⌋` times, since three would need strictly more than `n` occurrences in
total. The hash map counts every occurrence into a table keyed by the value
itself and then reads the answer off the table's two largest tallies — the
direct reading of the problem, billed as one entry per distinct value. The
extended Boyer-Moore vote never records an occurrence at all: two candidate
slots ride through the scan on four integers, retiring counts in matched
triples, which is the follow-up's linear-time, `O(1)`-space answer.

## Hash counts, then a top-two selection

Counting is the direct reading of the problem: walk `nums` once and tally
every occurrence into a hash map keyed by the value itself, so the map ends
up holding each distinct value's exact frequency. Nothing about the `⌊n/3⌋`
threshold is used while counting, and no ordering of `nums` is relied on
either — a hash table's iteration order is arbitrary, and the selection
below cannot tell. The map is the whole footprint: one entry per distinct
value.

The threshold acts in a selection pass over the map's entries. At most two
tallies can ever matter, so one scan over the entries finds them: two slots
track the best and second-best tallies seen so far, an entry takes the top
slot only with a strictly greater tally, and ties keep the earlier entry.
Tying loses nothing — values sharing a tally clear the threshold together
or fail together, so a failing value can never tie a qualifying one out of
a slot.

Selection only nominates; each slot's tally must still clear the bar, and
that check is what excludes an exactly-`⌊n/3⌋` value and discards a slot
that never filled — a tally of zero cannot pass. The slots hold distinct
values by construction, since each map key is visited exactly once, so no
equality check guards the second. The one or two survivors are finally
sorted ascending, pinning the output order the examples show (`[4,6]`).

**Complexity:** `O(n)` time, `O(n)` space.

## Extended Boyer-Moore voting

The scan keeps two candidate slots, each with its own counter — the two-slot generalization of the single-counter vote that solves the more-than-half variant. A value matching a slot raises that slot's counter; a value matching neither is adopted by a slot whose counter sits at zero; only when both slots are occupied and neither matches do both counters drop together. Four integers are the entire state, which is the `O(1)`-space answer to the follow-up, and no occurrence table is ever kept.

At most two answers can exist at all: three elements each appearing more than `⌊n/3⌋` times would need strictly more than `n` occurrences in total, which is impossible. Why every qualifying element survives the vote: whenever both counters drop, one occurrence of each standing candidate is retired together with the stranger that caused the drop — a triple of three pairwise distinct values — so each retired occurrence of a more-than-a-third element is paid for by two elements that are not it. There are strictly fewer than `2n/3` such partners available, which is not enough to retire all of its more-than-`n/3` occurrences, so it must be standing in a slot when the array ends.

The vote only nominates, so a verification pass recounts each nominee's real occurrences and keeps only those strictly above `⌊n/3⌋` — this is also where an exactly-`n/3` element is excluded, and where a faded false-positive candidate is dropped. The zero-or-one-or-two survivors are finally sorted ascending, which pins the output order the examples show (`[1,2]`); on an input whose every element is identical both slots hold the same value, and the second is kept only after checking it differs from the first.

**Complexity:** `O(n)` time, `O(1)` space.
