# Solutions

Every approach pairs a bookkeeping structure for lake state with a way to
find, when a full lake rains again, some dry day between the two rains.
The sorted list holds every unspent dry day in order and binary-searches
the first one past the previous rain, paying a logarithm on the search
and another on the removal. The union-find skip structure answers the
same question with no ordered container at all: every day points at the
next dry day still unspent, so one find with path compression both
locates the day and, by splicing it out once spent, keeps the whole sweep
near-linear.

## Spend the Earliest Dry Day After Each Previous Rain

Record `last[lake]`, the last day it rained over that lake, and keep every
unused dry-day index in a sorted structure. On rain over an empty lake,
mark it filled. On rain over a filled lake, binary-search the smallest
dry-day index after `last[lake]`; if none exists before today, no valid
answer exists — return the empty array. Otherwise assign that dry day to
this lake (write the lake number there), remove the day from the
structure, and update `last`. Dry days never needed stay in the structure
and are answered with lake `1` at the end. Each day does one search and
one removal.

**Complexity:** `O(n log n)` time for the searches and removals, `O(n)`
space for the structures.

## Union-Find Skip to the Next Unspent Dry Day

Drop the ordered container and let the days themselves carry the search.
Keep a pointer array `nxt` over day indices `0 .. n + 1`, each entry
starting at itself, read as "the first day at or after this one that is
still an unspent dry day". A rain day can never be spent, so on reaching
day `i` with rain we point `nxt[i]` at `i + 1` straight away; a dry day
is left pointing at itself, which is what marks it available.

When rain lands on a filled lake, `find(last[lake] + 1)` walks those
pointers to the first unspent dry day at or after the day following that
lake's previous rain. Every day below today has already been processed,
so the walk either stops on a genuine dry day or runs up to today; if
what comes back is `i` or later, no dry day separates the two rains and
the empty array is the answer. Otherwise that day takes the lake number
and is spent by pointing `nxt[j]` at `j + 1` — the union step, merging
the day into its successor so every later find skips straight over it.

Path compression flattens the chains as they are walked, so the sweep
costs an inverse-Ackermann factor per day instead of a logarithm. Dry
days never claimed keep pointing at themselves and already carry lake
`1` from the moment they were read.

**Complexity:** `O(n α(n))` time, `O(n)` space.
