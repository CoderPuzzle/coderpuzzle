# Solutions — Find the Maximum Number of Marked Indices

## Two Pointers on the Sorted Array

Each operation pairs a small element `i` with a large element `j` where `2 * nums[i] <= nums[j]`, and both get marked. To maximize the number of marked indices, sort the array and think about which elements play which role: in an optimal solution with `p` pairs, the small halves must be `p` elements from the lower part of the sorted order and the large halves `p` elements from the upper part — pairing across any other split wastes "large" elements on easy matches.

Given that, the best strategy pairs the candidates _in order_: the smallest element with the smallest qualifying large element, the second smallest with the second qualifying, and so on. This is the classic exchange argument — matching a smaller `i` with a larger `j` than necessary can never enable additional pairs, since any element that fits under the displaced `j` also fits under the unused smaller one.

The implementation is a single two-pointer scan: `j` walks the upper half starting at index `(n + 1) // 2`, and `i` (starting at 0 in the lower half) advances only when `2 * nums[i] <= nums[j]`, recording one successful match. Starting `j` at the midpoint encodes the fact that matched large elements must be a subset of the upper half — if the answer had more than `n - (n+1)//2` pairs, two partners would have to come from the same half, which is impossible for the maximally matched count. The answer is `2 * i`, twice the number of matches.

**Complexity:** `O(n log n)` time, `O(n)` space for the sorted copy.
