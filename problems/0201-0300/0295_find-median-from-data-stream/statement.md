# Find Median from Data Stream

## Description

The **median** is the middle value in an ordered integer list. If the size of
the list is even, there is no middle value and the median is the mean of the
two middle values.

- For example, for `arr = [2, 3, 4]`, the median is `3`.
- For example, for `arr = [2, 3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the `MedianFinder` class:

- `MedianFinder()` Initializes the `MedianFinder` object.
- `void addNum(int num)` Adds the integer `num` from the data stream to the
  data structure.
- `double findMedian()` Returns the median of all elements so far.

### Example 1

```text
Input:
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output: [null, null, null, 1.5, null, 2.0]
Explanation:
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr = [1, 2, 3]
medianFinder.findMedian(); // return 2.0
```

### Example 2

```text
Input:
["MedianFinder", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian"]
[[], [5], [], [2], [], [7], [], [0], []]
Output: [null, null, 5.0, null, 3.5, null, 5.0, null, 3.5]
Explanation:
medianFinder.addNum(5);    // arr = [5]
medianFinder.findMedian(); // return 5.0
medianFinder.addNum(2);    // arr = [2, 5]
medianFinder.findMedian(); // return (2 + 5) / 2 = 3.5
medianFinder.addNum(7);    // arr = [2, 5, 7]
medianFinder.findMedian(); // return 5.0
medianFinder.addNum(0);    // arr = [0, 2, 5, 7]
medianFinder.findMedian(); // return (2 + 5) / 2 = 3.5
```

### Constraints

- `-10⁵ <= num <= 10⁵`
- There will be at least one element in the data structure before calling
  `findMedian`.
- At most `5 * 10⁴` calls will be made to `addNum` and `findMedian`.

### Follow-up

If all numbers from the stream were guaranteed to lie in `[0, 100]`, what
counting structure would answer `findMedian` without any comparisons at all?
And if only 99% of them did?

## Hints

### Hint 1

The median depends only on the middle of the sorted order, so split the
stream around it: keep the smaller half in one structure and the larger half
in another. What matters is that the largest of the smaller half and the
smallest of the larger half are both instantly reachable.

### Hint 2

A max-heap exposes the largest of the smaller half and a min-heap the smallest
of the larger half — exactly the two values an even-length median averages,
while an odd-length median is the top of whichever half holds the extra
element. Size the halves to differ by at most one.

### Hint 3

To insert `num`, first push it onto one heap, then move that heap's top across
to the other, then rebalance if a half grew two elements larger. Routing every
number through both heaps keeps the ordering invariant true regardless of
where the new value belongs.
