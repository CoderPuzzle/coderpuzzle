# Solutions — Plates Between Candles

## Prefix plates and nearest candles

Precompute a prefix count of plates, the nearest candle at or before every index, and the nearest candle at or after every index. For query `[left, right]`, the first usable candle is the right-nearest candle from `left`, while the last usable candle is the left-nearest candle from `right`.

If either candle is missing or the first is not strictly before the last, the answer is zero. Otherwise the prefix-count difference between their indices counts exactly the plates enclosed by those candles, so every query is answered in constant time without sorting or searching.

**Complexity:** `O(n + q)` time and `O(n)` space.
