# Maximize Alternating Sum Using Swaps

## Description

The alternating sum of an array adds the elements at even indices and
subtracts the elements at odd indices: `nums[0] - nums[1] + nums[2] -
nums[3] + ...`.

You are given an integer array `nums` and a list of index pairs `swaps`,
where `swaps[i] = [pᵢ, qᵢ]`. Each pair lets you swap the elements at
indices `pᵢ` and `qᵢ`, and every pair may be used any number of times, in
any order.

Return the maximum alternating sum over all arrangements of `nums` that
can be reached by applying those swaps.

### Example 1

```text
Input: nums = [1,2,3], swaps = [[0,2],[1,2]]
Output: 4
Explanation: The maximum is reached at [2,1,3] or [3,1,2]. One way to
obtain [2,1,3]: swap indices 0 and 2 to get [3,2,1]; swap indices 1 and 2
to get [3,1,2]; swap indices 0 and 2 to get [2,1,3].
```

### Example 2

```text
Input: nums = [1,2,3], swaps = [[1,2]]
Output: 2
Explanation: No arrangement beats the starting one: 1 - 2 + 3 = 2.
```

### Example 3

```text
Input: nums = [1,1000000000,1,1000000000,1,1000000000], swaps = []
Output: -2999999997
Explanation: With no usable pairs the arrangement is fixed:
1 - 1000000000 + 1 - 1000000000 + 1 - 1000000000 = -2999999997.
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `0 <= swaps.length <= 10⁵`
- `swaps[i] = [pᵢ, qᵢ]` with `0 <= pᵢ < qᵢ <= nums.length - 1`
- `[pᵢ, qᵢ] != [pⱼ, qⱼ]` for `i != j`

## Hints

### Hint 1

Treat every pair as an edge between two indices: indices connected through
these edges can exchange elements freely, so merge them into components
with a disjoint-set union.

### Hint 2

Inside one component, let `E` be its number of even indices. Placing the
`E` largest values of the component on those even positions maximizes what
the component contributes.

### Hint 3

That contribution is `2 * sumTopE - sumAll`, where `sumTopE` is the sum of
the `E` largest values and `sumAll` is the sum of every value in the
component. Accumulate the answer in a 64-bit integer.
