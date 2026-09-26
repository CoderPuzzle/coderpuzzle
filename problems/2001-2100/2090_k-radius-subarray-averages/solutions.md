# Solutions — K Radius Subarray Averages

## Maintain one fixed-width window sum

Initialize every answer to `-1`. If the required width `2 * k + 1` fits, sum the first window with a 64-bit accumulator and store its integer average at center `k`. Then slide the window one position at a time, adding the new rightmost value and removing the old leftmost value before filling the next center.

![On nums [7,4,3,9,1,8,5,2,6] with k = 3, the width-7 window starts at sum 37 for avg[3] = 5, then slides by dropping 7 and adding 2 for sum 32 and dropping 4 and adding 6 for sum 34, giving avgs [-1,-1,-1,5,4,4,-1,-1,-1].](figures/solution-sliding-window-sum.svg)

Each element enters and leaves the running sum at most once. The returned array takes linear space, while the sliding-window state itself is constant-sized.

**Complexity:** `O(n)` time, `O(n)` output space, and `O(1)` auxiliary space.
