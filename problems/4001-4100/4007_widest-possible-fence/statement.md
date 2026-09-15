# Widest Possible Fence

## Description

You are given an integer array `planks`, where `planks[i]` represents the
height of the ith wooden plank. Each plank has a width of 1 unit.

You want to build a fence consisting of planks that all have the same height.

You may either use a plank as is, or combine exactly two distinct original
planks into a single plank whose height equals the sum of their heights.
Each original plank can be used at most once, and not all original planks
need to be used.

Return the maximum possible width of the fence that can be built.

### Example 1

```text
Input: planks = [1,3,2,5,7,5,4,2,1]
Output: 4
Explanation: We can have four planks of height 5.

planks[3] = 5
planks[5] = 5
planks[0] + planks[6] = 1 + 4 = 5
planks[1] + planks[2] = 3 + 2 = 5

Hence, the maximum width is 4.
```

### Example 2

```text
Input: planks = [2,3,7]
Output: 1
Explanation: It is impossible to form two planks of the same height, even
after combining two distinct original planks.
Since not all original planks need to be used, we can choose any one plank
as the fence.
Therefore, the maximum possible width is 1.
```

### Constraints

- `1 <= planks.length <= 1000`
- `1 <= planks[i] <= 10⁹`

## Hints

### Hint 1

Fix the common fence height h. Every original plank of height h can be used by itself.

### Hint 2

Any remaining plank of height x < h can only be used by pairing it with a plank of height h - x.

### Hint 3

Using the frequency of each height, count these disjoint pairs with min(freq[x], freq[h - x]); when x == h - x, use freq[x] / 2.

### Hint 4

It is enough to try heights that occur as an original plank height or as the sum of two original plank heights. Take the maximum number of single planks and pairs over all such heights.
