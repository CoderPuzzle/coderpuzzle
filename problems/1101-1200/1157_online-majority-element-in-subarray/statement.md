# Online Majority Element In Subarray

## Description

Design a data structure that efficiently finds the majority element of a
given subarray.

The majority element of a subarray is an element that occurs `threshold`
times or more in the subarray.

Implement the `MajorityChecker` class:

- `MajorityChecker(int[] arr)` Initializes the instance of the class with
  the array `arr`.
- `int query(int left, int right, int threshold)` returns the element in
  the subarray `arr[left...right]` that occurs at least `threshold` times,
  or `-1` if no such element exists.

### Example 1

```text
Input:
["MajorityChecker", "query", "query", "query"]
[[[1, 1, 2, 2, 1, 1]], [0, 5, 4], [0, 3, 3], [2, 3, 2]]
Output: [null, 1, -1, 2]
Explanation:
MajorityChecker majorityChecker = new MajorityChecker([1, 1, 2, 2, 1, 1]);
majorityChecker.query(0, 5, 4); // returns 1
majorityChecker.query(0, 3, 3); // returns -1
majorityChecker.query(2, 3, 2); // returns 2
```

### Example 2

```text
Input:
["MajorityChecker", "query", "query", "query"]
[[[7, 7, 7, 9]], [0, 3, 3], [0, 2, 2], [3, 3, 1]]
Output: [null, 7, 7, 9]
Explanation:
MajorityChecker majorityChecker = new MajorityChecker([7, 7, 7, 9]);
majorityChecker.query(0, 3, 3); // 7 occurs 3 times in [7, 7, 7, 9]
majorityChecker.query(0, 2, 2); // 7 occurs 3 times in [7, 7, 7], clearing
                                // the threshold of 2
majorityChecker.query(3, 3, 1); // a length-1 subarray answers itself
```

### Constraints

- `1 <= arr.length <= 2 * 10⁴`
- `1 <= arr[i] <= 2 * 10⁴`
- `0 <= left <= right < arr.length`
- `threshold <= right - left + 1`
- `2 * threshold > right - left + 1`
- At most `10⁴` calls will be made to `query`.

## Hints

### Hint 1

Because `2 * threshold > right - left + 1`, any element reaching the
threshold occupies strictly more than half the subarray — so at most one
answer can exist. The whole problem reduces to proposing the right
candidate and then counting it exactly.

### Hint 2

Boyer-Moore voting composes: a node storing `(candidate, surplus votes)`
for its range merges two children in `O(1)` (equal candidates add, else the
heavier survives with the difference). A segment tree over these pairs
therefore surfaces the only possible candidate of any range using `O(log n)`
nodes.

### Hint 3

The vote can lie — when no strict majority exists the fold returns some
arbitrary survivor. Verify before answering: keep each value's sorted list
of positions, and count occurrences in `[left, right]` as the difference of
two binary searches.
