# Solutions — Two Best Non-Overlapping Events

## Start-time order and suffix maxima

Sort the events by start time and build a suffix array where each position stores the greatest event value from that position onward. For each event, binary-search for the first later event whose start is strictly greater than the current inclusive end; the suffix maximum there is the best compatible second choice.

![Sorting [[1,3,2],[2,4,3],[4,5,2]] by start, event #0 with end 3 searches to event #1 at start 4 (suffix max 2) for 2 + 2 = 4, while event #2 with end 4 finds no later start, so 4 is the answer.](figures/solution-start-order-suffix-max.svg)

Combine the current value with that compatible suffix maximum and compare it with the best result so far. Keeping the current value as a candidate by itself handles cases where every pair overlaps or one event is worth more than any compatible pair.

**Complexity:** `O(n log n)` time and `O(n)` space.
