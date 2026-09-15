# Solutions — Choose Numbers From Two Arrays in Range

## Dynamic programming by signed difference

Treat choosing `nums1[i]` as adding `nums1[i]` to a signed difference and choosing `nums2[i]` as subtracting `nums2[i]`. A range is balanced exactly when its final difference is zero.

Maintain counts for every difference obtainable by ranges ending at the previous index. At the current index, start both one-element choices and extend every previous range with either choice. Add the new zero-difference count to the answer.

**Complexity:** `O(nS)` time and `O(S)` space, where `S <= 20,000` is the signed-difference range.
