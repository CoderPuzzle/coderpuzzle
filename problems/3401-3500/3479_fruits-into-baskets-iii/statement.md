# Fruits Into Baskets III

## Description

You are given two arrays of integers, `fruits` and `baskets`, each of length
`n`, where `fruits[i]` represents the quantity of the `ith` type of fruit, and
`baskets[j]` represents the capacity of the `jth` basket.

From left to right, place the fruits according to these rules:

- Each fruit type must be placed in the leftmost available basket with a
  capacity greater than or equal to the quantity of that fruit type.
- Each basket can hold only one type of fruit.
- If a fruit type cannot be placed in any basket, it remains unplaced.

Return the number of fruit types that remain unplaced after all possible
allocations are made.

### Example 1

```text
Input: fruits = [4,2,5], baskets = [3,5,4]
Output: 1
Explanation: fruits[0] = 4 is placed in baskets[1] = 5.
fruits[1] = 2 is placed in baskets[0] = 3.
fruits[2] = 5 cannot be placed in baskets[2] = 4.

Since one fruit type remains unplaced, we return 1.
```

### Example 2

```text
Input: fruits = [3,6,1], baskets = [6,4,7]
Output: 0
Explanation: fruits[0] = 3 is placed in baskets[0] = 6.
fruits[1] = 6 cannot be placed in baskets[1] = 4 (insufficient capacity) but
can be placed in the next available basket, baskets[2] = 7.
fruits[2] = 1 is placed in baskets[1] = 4.

Since all fruits are successfully placed, we return 0.
```

### Constraints

- `n == fruits.length == baskets.length`
- `1 <= n <= 10⁵`
- `1 <= fruits[i], baskets[i] <= 10⁹`

## Hints

### Hint 1

Sort the baskets by the pair of (basket[i], i) in the array.

### Hint 2

For each fruit from left to right, use binary search to find the first index
in the sorted array such that basket[i] >= fruit.

### Hint 3

Use a segment tree to maintain the smallest original indices where
basket[i] >= fruit.

### Hint 4

When a valid index is found, set the corresponding point to infinity to mark
it as used.
