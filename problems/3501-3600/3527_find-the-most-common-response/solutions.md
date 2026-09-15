# Solutions — Find the Most Common Response

## Per-day dedupe, then a counting hash map

Only a response's presence in a day matters, never how many times it was
repeated there, so each day collapses to its set of distinct words first.
A single hash map then tallies those deduped words across all days, and one
pass over the map keeps the best entry seen: strictly larger counts win,
and equal counts fall back to the lexicographically smaller word. Because
that comparison is a total order, the map's iteration order is irrelevant —
the same answer comes out regardless.

The total work is one hash operation per (already deduped) entry plus one
pass over the distinct vocabulary, so the run is linear in the input size.
Memory holds the distinct words only, which is bounded by the input.

**Complexity:** `O(total responses)` time, `O(distinct responses)` space.
