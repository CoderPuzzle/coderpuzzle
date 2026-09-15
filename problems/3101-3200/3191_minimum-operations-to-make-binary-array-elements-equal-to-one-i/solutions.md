# Solutions — Minimum Operations to Make Binary Array Elements Equal to One I

## Greedy left-to-right flips

The leftmost cell dictates everything: nums[0] can only ever be flipped by the one operation that covers positions 0, 1, 2, so if nums[0] is 0 that operation is forced. The same reasoning then applies to index 1 once index 0 is settled — the only operation that can still change position 1 without touching position 0 starts at 1 — and by induction every position whose running value is 0 forces exactly the operation starting there.

The code makes this deterministic sweep on a copy of the array: scanning i from 0 to n - 3, whenever arr[i] is 0 it counts one operation and XORs the triple arr[i], arr[i + 1], arr[i + 2]. After the scan the first n - 2 positions are all 1 by construction; feasibility therefore hinges only on the last two cells, which can no longer be operated on. If a 0 survives anywhere the array is unfixable and the answer is -1.

![[0,1,1,1,0,0] through the three forced flips at i = 0, 1 and 3, ending all ones after 3 operations.](figures/solution-greedy-flips.svg)

Each forced flip is necessary, so the count is a lower bound achieved exactly — no solution can do better than one operation per forced position, and the sweep performs precisely those. All-ones and all-zeros inputs fall out naturally: the former costs 0, the latter costs ceil((n - 2) / 3) rounded through the pattern of re-created zeros the flips leave behind.

**Complexity:** `O(n)` time, `O(n)` space.
