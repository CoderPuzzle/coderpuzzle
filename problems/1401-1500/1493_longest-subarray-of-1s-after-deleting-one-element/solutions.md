# Solutions — Longest Subarray of 1's After Deleting One Element

## Sliding Window With At Most One Zero

Deleting one element and taking the longest all-ones stretch is equivalent to finding the longest window containing at most one zero and then deleting that zero. A second zero forces the window to shrink, since a single deletion cannot remove two zeros.

The solution maintains a window and a count of the zeros inside it. Each incoming element raises the count when it is a zero; while the count exceeds one, the left edge advances, decrementing the count whenever it passes a zero. The largest window length seen is recorded. Since exactly one deletion is mandatory, the answer is one less than that best window length — the window's lone zero occupies the deleted slot.

The subtle case is an array of all ones, where no window ever contains a zero and nothing actually needs removing — yet one element must still be deleted, so the answer is n - 1; the code detects this from the final zero count and returns it directly. When the array does contain a zero, the final window always holds exactly one: the left edge can never advance past the last zero, because the shrink loop only runs while two zeros are inside, and there is no second zero beyond the last one to trigger it. Subtracting one from the best window is therefore always legitimate, including the degenerate case of an all-zero array, where the best window is a single zero and the answer is zero.

**Complexity:** `O(n)` time, `O(1)` space.
