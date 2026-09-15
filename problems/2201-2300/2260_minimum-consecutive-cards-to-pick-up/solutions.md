# Solutions

## Hash map of last occurrences

Scan the deck once, keeping a hash map from each card value to the index of
its most recent occurrence. When the current value was seen before at index
`prev`, the window from `prev` through the current index is a consecutive run
of `i - prev + 1` cards that contains a matching pair, so track the minimum
such window. Only the immediately preceding occurrence of each value matters:
any earlier occurrence yields an already-covered, longer window, so overwriting
the stored index on every step keeps every candidate considered exactly once.

If the scan finishes without ever seeing a repeated value, no consecutive
window can contain a matching pair and the answer is `-1`. The whole pass is
linear with constant work per card.

**Complexity:** `O(n)` time, `O(min(n, V))` space where `V` is the number of
distinct card values.
