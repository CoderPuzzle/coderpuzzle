# Solutions — Find Target Indices After Sorting Array

## Count the target's sorted block

Count how many values are strictly smaller than `target` and how many equal it. After sorting, every smaller value must come first and all equal values form one contiguous block.

Therefore the answer is the increasing range beginning at the smaller-value count and containing exactly the equal-value count of indices. No mutation or explicit sorting is needed.

**Complexity:** `O(n + r)` time and `O(r)` output space with `O(1)` extra space, where `r` is the number of returned indices.
