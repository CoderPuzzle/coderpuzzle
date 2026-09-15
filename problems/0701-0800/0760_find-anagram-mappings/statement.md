# Find Anagram Mappings

## Description

You are given two integer arrays `nums1` and `nums2`, where `nums2` is an
anagram of `nums1`. Both arrays may contain duplicates.

Return an index mapping array `mapping` from `nums1` to `nums2`, where
`mapping[i] = j` means the `i`th element of `nums1` appears in `nums2` at
index `j`.

An array `a` is an anagram of an array `b` if `b` is made by randomizing the
order of the elements in `a`.

When a value repeats, several mappings are valid, since each copy may claim
any still-unused position holding that value. This problem pins one
deterministic answer: walk `nums1` from left to right and give each element
the leftmost matching index in `nums2` that no earlier element has taken.

### Example 1

```text
Input: nums1 = [12,28,46,32,50], nums2 = [50,12,32,46,28]
Output: [1,4,3,2,0]
Explanation: mapping[0] = 1 because the 0th element of nums1, 12, appears at
nums2[1]; mapping[1] = 4 because the 1st element, 28, appears at nums2[4]; and
so on. Every value is distinct here, so the pinned rule simply matches each
element with its only position.
```

### Example 2

```text
Input: nums1 = [84,46], nums2 = [84,46]
Output: [0,1]
Explanation: The two arrays agree element for element, so each element takes
its own index.
```

### Constraints

- `1 <= nums1.length <= 100`
- `nums2.length == nums1.length`
- `0 <= nums1[i], nums2[i] <= 10⁵`
- `nums2` is an anagram of `nums1`.

## Hints

### Hint 1

Build a hash map recording, for each value, where it sits in `nums2` — then
the answer is one lookup per element of `nums1`. What must the map hold when a
value appears more than once?
