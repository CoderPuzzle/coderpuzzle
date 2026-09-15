# Solutions — Design an ATM Machine

## Greedy largest-first withdrawal with rollback

Deposits simply add to the five per-denomination counters. A withdrawal
walks the denominations from the largest (`500`) down to the smallest
(`20`), taking as many notes of each as both the machine's stock and the
remaining amount allow — the greedy choice, safe because every note value
divides into the total this way down the chain and taking fewer large
notes can never be repaired by smaller ones.

If anything remains after the smallest denomination, the amount cannot be
formed and the machine answers `[-1]` with its counters untouched — the
tentative takes are discarded rather than applied. Otherwise the takes are
subtracted and returned as the five per-denomination counts.

**Complexity:** `O(1)` time per operation (five denominations), `O(1)`
space.
