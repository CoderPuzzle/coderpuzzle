# Kth Largest Element in a Stream

## Description

You are part of a university admissions office and need to keep track of the
kth highest test score from applicants in real-time. This helps to determine
cut-off marks for interviews and admissions dynamically as new applicants
submit their scores.

Design a class that, for a given integer `k`, maintains a stream of test
scores and continuously returns the kth highest test score after a new score
has been submitted. More specifically, we are looking for the kth highest
score in the sorted list of all scores.

Implement the `KthLargest` class:

- `KthLargest(int k, int[] nums)` Initializes the object with the integer `k`
  and the stream of test scores `nums`.
- `int add(int val)` Adds the new test score `val` to the stream and returns
  the element representing the kth largest element in the pool of test scores
  so far.

### Example 1

```text
Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
Explanation:
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
```

### Example 2

```text
Input:
["KthLargest", "add", "add", "add", "add"]
[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]
Output: [null, 7, 7, 7, 8]
Explanation:
KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);
kthLargest.add(2);   // return 7
kthLargest.add(10);  // return 7
kthLargest.add(9);   // return 7
kthLargest.add(9);   // return 8
```

### Constraints

- `0 <= nums.length <= 10⁴`
- `1 <= k <= nums.length + 1`
- `-10⁴ <= nums[i] <= 10⁴`
- `-10⁴ <= val <= 10⁴`
- At most `10⁴` calls will be made to `add`.

## Hints

### Hint 1

The kth largest element only needs the top `k` elements — anything smaller can
never influence the answer until it is displaced by something even smaller,
which never happens. So the state worth keeping is exactly the `k` largest
values seen so far.

### Hint 2

Of the top `k` values, the one you must read after every insertion is the
**smallest** of them — that value is the kth largest. A min-heap exposes its
minimum in constant time.

### Hint 3

Keep the heap capped at size `k`: push the new value, then pop the minimum if
the heap has grown past `k`. The popped value is the one that just fell out of
the top `k`. Building the initial heap from `nums` and trimming it to size `k`
prepares the same invariant before the first `add`.
