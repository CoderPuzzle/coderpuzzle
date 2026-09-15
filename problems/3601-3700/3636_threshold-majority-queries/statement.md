# Threshold Majority Queries

## Description

You are given an integer array `nums` of length `n` and an integer array
`queries`, where `queries[i] = [li, ri, thresholdi]`.

Return an integer array `answer` where `answer[i]` is determined by the
subarray `nums[li..ri]`: among its elements that appear at least
`thresholdi` times, take the one with the highest frequency — if several
elements tie for the highest frequency, take the smallest of them — and that
element is `answer[i]`. If no element appears at least `thresholdi` times in
the subarray, set `answer[i]` to `-1`.

### Example 1

```text
Input: nums = [1,1,2,2,1,1], queries = [[0,5,4],[0,3,3],[2,3,2]]
Output: [1,-1,2]
Explanation:
    Query [0, 5, 4]: the subarray [1, 1, 2, 2, 1, 1] has 1 four times and 2 twice; only 1 appears at least 4 times, so the answer is 1.
    Query [0, 3, 3]: the subarray [1, 1, 2, 2] has 1 twice and 2 twice; neither element appears at least 3 times, so the answer is -1.
    Query [2, 3, 2]: the subarray [2, 2] has 2 twice, which meets the threshold, so the answer is 2.
```

### Example 2

```text
Input: nums = [3,2,3,2,3,2,3], queries = [[0,6,4],[1,5,2],[2,4,1],[3,3,1]]
Output: [3,2,3,2]
Explanation:
    Query [0, 6, 4]: the subarray [3, 2, 3, 2, 3, 2, 3] has 3 four times and 2 three times; 3 has the highest frequency and clears the threshold, so the answer is 3.
    Query [1, 5, 2]: the subarray [2, 3, 2, 3, 2] has 2 three times and 3 twice; the answer is 2.
    Query [2, 4, 1]: the subarray [3, 2, 3] has 3 twice and 2 once; every element clears the threshold of 1 and 3 is the most frequent, so the answer is 3.
    Query [3, 3, 1]: the subarray [2] is a single element appearing once, so the answer is 2.
```

### Constraints

- `1 <= n == nums.length <= 10⁴`
- `1 <= nums[i] <= 10⁹`
- `1 <= queries.length <= 5 * 10⁴`
- `queries[i] = [li, ri, thresholdi]`
- `0 <= li <= ri < n`
- `1 <= thresholdi <= ri - li + 1`

## Hints

### Hint 1

Use sqrt decomposition: let `B = int(sqrt(n))` and sort the queries by
`(l // B, r)`.

### Hint 2

Maintain window `[L, R]` with a frequency map `cnt` and buckets `bucket[f]`
of values at count `f`.

### Hint 3

Slide `L` and `R` per query, updating `cnt` and `bucket`, then scan from
`threshold` to max frequency to find the smallest valid value or `-1`.
