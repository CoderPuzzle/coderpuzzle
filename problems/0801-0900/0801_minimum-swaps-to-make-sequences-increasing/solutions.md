# Solutions — Minimum Swaps To Make Sequences Increasing

## Two-state keep/swap DP

At every index `i` only two configurations matter: the pair `nums1[i], nums2[i]` left in place, or the two swapped. Define `keep` and `swap` as the minimum operations needed to make both arrays strictly increasing through index `i` with index `i` respectively unswapped and swapped; a full solution is a sequence of per-index choices, and only consecutive indices constrain each other.

A transition from index `i-1` to `i` is legal only if both arrays remain strictly increasing under that combination of choices, which is checked with two conditions on the four values around the boundary. The natural ordering `nums1[i-1] < nums1[i]` and `nums2[i-1] < nums2[i]` licenses staying consistent (`keep <- keep`) and swapping at both indices together (`swap <- swap + 1`). The crossed ordering `nums1[i-1] < nums2[i]` and `nums2[i-1] < nums1[i]` licenses flipping the choice at `i` relative to `i-1` (`keep <- swap`, `swap <- keep + 1`). Both conditions can hold simultaneously — the code takes the minimum over whichever are available, and the input guarantee of solvability ensures at least one always holds, so no state stays infinite.

Initialize with `keep = 0, swap = 1` at index 0 (one operation if the first pair is swapped) and roll the two values forward, keeping only the previous index's pair — the answer is `min(keep, swap)` at the last index. Equal values at adjacent positions (allowed to fail one condition) are exactly why both checks are needed.

Example 1 (`nums1 = [1,3,5,4]`, `nums2 = [1,2,3,7]`) rolls the state pair forward:

1. At index 0 the pair starts as `keep = 0, swap = 1`.
2. Index 1 (3 over 2): both orderings hold, so `keep = 0, swap = 1`.
3. Index 2 (5 over 3): only the consistent ordering survives (3 < 5 but 3 is not < 3), giving `keep = 0, swap = 2`.
4. Index 3 (4 over 7): only the crossed ordering survives (5 < 7 and 3 < 4), giving `keep = 2, swap = 1` — the swap is forced exactly at the statement's position.
5. The answer is `min(2, 1) = 1`.

**Complexity:** `O(n)` time, `O(1)` space (two rolling values).
