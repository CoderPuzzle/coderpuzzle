# Dot Product of Two Sparse Vectors

## Description

Given two sparse vectors, compute their dot product.

Implement class SparseVector:

- `SparseVector(nums)` Initializes the object with the vector nums
- `dotProduct(vec)` Compute the dot product between the instance of
  SparseVector and vec

A sparse vector is a vector that has mostly zero values, you should store
the sparse vector efficiently and compute the dot product between two
SparseVector.

Follow up: What if only one of the vectors is sparse?

**Note (CoderPuzzle):** this problem judges the exact two-object API. A case
constructs two independent `SparseVector` instances (named `v1` and
`v2`), then calls `dotProduct` on one of them handing the other live
object over — the submission's `dotProduct` receives an actual
`SparseVector`, never a plain array. The vector lengths can reach `10⁵`,
so construction and the product must both avoid dense per-entry work in
the product step.

### Example 1

```text
Input: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0]
Output: 8
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 1*0 + 0*3 + 0*0 + 2*4 + 3*0 = 8
```

### Example 2

```text
Input: nums1 = [0,1,0,0,0], nums2 = [0,0,0,0,2]
Output: 0
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 0*0 + 1*0 + 0*0 + 0*0 + 0*2 = 0
```

### Example 3

```text
Input: nums1 = [0,1,0,0,2,0,0], nums2 = [1,0,0,0,3,0,4]
Output: 6
```

### Constraints

- `n == nums1.length == nums2.length`
- `1 <= n <= 10⁵`
- `0 <= nums1[i], nums2[i] <= 100`

## Hints

### Hint 1

Because the vector is sparse, use a data structure that stores the index
and value where the element is nonzero.
