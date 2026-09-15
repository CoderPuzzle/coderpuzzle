# Moving Average from Data Stream

## Description

Given a stream of integers and a window size `size`, calculate the moving
average of all integers in the sliding window.

Implement the `MovingAverage` class:

- `MovingAverage(int size)` Initializes the object with the size of the
  window `size`.
- `double next(int val)` Returns the moving average of the last `size`
  values of the stream.

`next` returns the full-precision double `window sum / window count`, so
`(1 + 10 + 3) / 3` comes back as `4.666666666666667`; the example below
rounds that value to `4.66667` for display.

### Example 1

```text
Input:
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]
Output: [null, 1.0, 5.5, 4.66667, 6.0]
Explanation:
MovingAverage movingAverage = new MovingAverage(3);
movingAverage.next(1);  // return 1.0 = 1 / 1
movingAverage.next(10); // return 5.5 = (1 + 10) / 2
movingAverage.next(3);  // return 4.66667 = (1 + 10 + 3) / 3
movingAverage.next(5);  // return 6.0 = (10 + 3 + 5) / 3
```

### Constraints

- `1 <= size <= 1000`
- `-10⁵ <= val <= 10⁵`
- At most `10⁴` calls will be made to `next`.
