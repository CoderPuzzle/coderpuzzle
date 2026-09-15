# Maximum Sum Queries

## Description

You are given two 0-indexed integer arrays nums1 and nums2, each of
length n, and a 1-indexed 2D array queries where queries[i] = [xi, yi].

For the ith query, find the maximum value of nums1[j] + nums2[j] among all
indices j (0 <= j < n), where nums1[j] >= xi and nums2[j] >= yi, or -1 if
there is no j satisfying the constraints.

Return an array answer where answer[i] is the answer to the ith query.

### Example 1

```text
Input: nums1 = [4,3,1,2], nums2 = [2,4,9,5], queries = [[4,1],[1,3],[2,5]]
Output: [6,10,7]
Explanation:
For the 1st query xi = 4 and yi = 1, we can select index j = 0 since nums1[j] >= 4 and nums2[j] >= 1. The sum nums1[j] + nums2[j] is 6, and we can show that 6 is the maximum we can obtain.

For the 2nd query xi = 1 and yi = 3, we can select index j = 2 since nums1[j] >= 1 and nums2[j] >= 3. The sum nums1[j] + nums2[j] is 10, and we can show that 10 is the maximum we can obtain.

For the 3rd query xi = 2 and yi = 5, we can select index j = 3 since nums1[j] >= 2 and nums2[j] >= 5. The sum nums1[j] + nums2[j] is 7, and we can show that 7 is the maximum we can obtain.

Therefore, we return [6,10,7].
```

### Example 2

```text
Input: nums1 = [3,2,5], nums2 = [2,3,4], queries = [[4,4],[3,2],[1,1]]
Output: [9,9,9]
Explanation: For this example, we can use index j = 2 for all the queries since it satisfies the constraints for each query.
```

### Example 3

```text
Input: nums1 = [2,1], nums2 = [2,3], queries = [[3,3]]
Output: [-1]
Explanation: There is one query in this example with xi = 3 and yi = 3. For every index, j, either nums1[j] < xi or nums2[j] < yi. Hence, there is no solution.
```

### Constraints

- `nums1.length == nums2.length`
- `n == nums1.length`
- `1 <= n <= 10⁵`
- `1 <= nums1[i], nums2[i] <= 10⁹`
- `1 <= queries.length <= 10⁵`
- `queries[i].length == 2`
- `xi == queries[i][1]`
- `yi == queries[i][2]`
- `1 <= xi, yi <= 10⁹`

## Hints

### Hint 1

Sort (x, y) tuples and queries by x-coordinate descending. Don’t forget to index queries before sorting so that you can answer them in the correct order.

### Hint 2

Before answering a query (min_x, min_y), add all (x, y) pairs with x >= min_x to some data structure.

### Hint 3

Use a monotone descending map to store (y, x + y) pairs. A monotone map has ascending keys and descending values. When inserting a pair (y, x + y), remove all pairs (y', x' + y') with y' < y and x' + y' <= x + y.

### Hint 4

To find the insertion position use binary search (built-in in many languages).

### Hint 5

When querying for max (x + y) over y >= y', use binary search to find the first pair (y, x + y) with y >= y'. It will have the maximum value of x + y because the map has monotone descending values.
