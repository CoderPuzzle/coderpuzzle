# Range Frequency Queries

## Description

Design a data structure to find the frequency of a given value in a given subarray.

The frequency of a value in a subarray is the number of occurrences of that value in the subarray.

Implement the `RangeFreqQuery` class:

- `RangeFreqQuery(int[] arr)` Constructs an instance of the class with the given 0-indexed integer array `arr`.
- `int query(int left, int right, int value)` Returns the frequency of `value` in the subarray `arr[left...right]`.

A subarray is a contiguous sequence of elements within an array. `arr[left...right]` denotes the subarray that contains the elements of `nums` between indices `left` and `right` (inclusive).

### Example 1

```text
Input
["RangeFreqQuery", "query", "query"]
[[[12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]], [1, 2, 4], [0, 11, 33]]
Output
[null, 1, 2]

Explanation
RangeFreqQuery rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
rangeFreqQuery.query(1, 2, 4); // return 1. The value 4 occurs 1 time in the subarray [33, 4]
rangeFreqQuery.query(0, 11, 33); // return 2. The value 33 occurs 2 times in the whole array.
```

### Constraints

- `1 <= arr.length <= 10⁵`
- `1 <= arr[i], value <= 10⁴`
- `0 <= left <= right < arr.length`
- At most `10⁵` calls will be made to `query`

## Hints

### Hint 1

The queries must be answered efficiently to avoid time limit exceeded verdict.

### Hint 2

Store the elements of the array in a data structure that helps answering the queries efficiently.

### Hint 3

Use a hash table that stored for each value, the indices where that value appeared.

### Hint 4

Use binary search over the indices of a value to find its range frequency.
