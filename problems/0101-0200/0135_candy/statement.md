# Candy

## Description

There are `n` children standing in a line. Each child is assigned a
rating value given in the integer array `ratings`.

You are giving candies to these children subjected to the following
requirements:

- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return _the minimum number of candies_ you need to have to distribute the
candies to the children.

### Example 1

```text
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
```

### Example 2

```text
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
```

### Constraints

- `1 <= n == ratings.length <= 5 * 10^4`
- `0 <= ratings[i] <= 5 * 10^4`

## Hints

### Hint 1

Make two passes: left to right to satisfy the 'strictly higher than the left neighbor' rule, then right to left for the right neighbor rule.

### Hint 2

Initialize every child with one candy and only raise a value when a neighbor's rating is strictly higher.

### Hint 3

The final amount for each child is the max of the two passes; the answer is the sum over all children.
