# Maximum Product of Three Elements After One Replacement

## Description

You are given an integer array nums.

You must replace exactly one element of the array: choose a single index and
overwrite its value with any integer in the closed range `[-10⁵, 10⁵]`. The
replacement is mandatory, and the new value may coincide with the old one.

After this single replacement, take any three elements at distinct indices of
the modified array and multiply them together.

Return the maximum product that any such triple can achieve.

### Example 1

```text
Input: nums = [-5,7,0]
Output: 3500000
Explanation: Replace 0 with -100000 to get [-5,7,-100000]. Its three
elements multiply to (-5) * 7 * (-100000) = 3500000, and no replacement can
reach a larger product.
```

### Example 2

```text
Input: nums = [-4,-2,-1,-3]
Output: 1200000
Explanation: Replace -2 with 100000 to get [-4,100000,-1,-3]; the triple
(-4) * 100000 * (-3) = 1200000 is maximal. Replacing -1 instead reaches the
same product.
```

### Example 3

```text
Input: nums = [0,10,0]
Output: 0
Explanation: However the single replacement is made, at least one zero
always survives, so every triple still contains a zero and the maximum
product is 0.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `-10⁵ <= nums[i] <= 10⁵`

## Hints

### Hint 1

The replaced slot contributes the most when it is pushed to an endpoint of
its range, +10⁵ or -10⁵; pick the sign that matches the pair of untouched
elements it multiplies. The answer is therefore 10⁵ times the largest
absolute product of any pair of original values — a pair chosen for
magnitude, which need not be the two largest values.
