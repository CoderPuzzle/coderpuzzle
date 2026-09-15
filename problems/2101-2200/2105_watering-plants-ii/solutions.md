# Solutions — Watering Plants II

## Simulate both gardeners from the ends

Keep Alice's and Bob's remaining water while moving one pointer inward from each end. Before either waters a plant, refill that can exactly when its remaining water is insufficient, count the refill, and subtract the plant's need. Continue until the pointers meet or cross.

If one middle plant remains, the gardener with more remaining water handles it; only the larger remaining amount matters for the refill count. A final refill is needed exactly when even that amount is below the plant's need.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
