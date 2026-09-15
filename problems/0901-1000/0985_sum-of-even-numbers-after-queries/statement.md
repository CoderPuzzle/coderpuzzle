# Sum of Even Numbers After Queries

## Description

You are given an integer array `nums` and an array of queries `queries`, where
each query is a pair `queries[i] = [val_i, index_i]`.

The queries are processed one at a time, in the order given. Each query first
applies its update — `nums[index_i] = nums[index_i] + val_i` — and only after
the update has landed does it take its reading: the sum of the even values of
`nums` at that moment.

Return an integer array `answer`, where `answer[i]` is the sum of the even
values of `nums` after the `i`-th query has been applied.

### Example 1

```text
Input: nums = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]
Output: [8,6,2,4]
Explanation: The array starts as [1,2,3,4].
After adding 1 to nums[0], the array is [2,2,3,4], and the sum of even values
is 2 + 2 + 4 = 8.
After adding -3 to nums[1], the array is [2,-1,3,4], and the sum of even
values is 2 + 4 = 6.
After adding -4 to nums[0], the array is [-2,-1,3,4], and the sum of even
values is -2 + 4 = 2.
After adding 2 to nums[3], the array is [-2,-1,3,6], and the sum of even
values is -2 + 6 = 4.
```

### Example 2

```text
Input: nums = [1], queries = [[4,0]]
Output: [0]
Explanation: Adding 4 to nums[0] turns the only value into 5, which is odd,
so the sum of even values is 0.
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`
- `1 <= queries.length <= 10⁴`
- `-10⁴ <= val_i <= 10⁴`
- `0 <= index_i < nums.length`
