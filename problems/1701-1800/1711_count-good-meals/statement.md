# Count Good Meals

## Description

A good meal is a meal that contains exactly two different food items with a
sum of deliciousness equal to a power of two.

You can pick any two different foods to make a good meal.

Given an integer array `deliciousness`, where `deliciousness[i]` is the
deliciousness of the `i`-th item of food, return the number of different
good meals you can make from this list modulo 10⁹ + 7.

Note that items with different indices are considered different even if they
have the same deliciousness value.

### Example 1

```text
Input: deliciousness = [1,3,5,7,9]
Output: 4
Explanation: The good meals are (1,3), (1,7), (3,5), and (7,9).
Their respective sums are 4, 8, 8, and 16, all of which are powers of 2.
```

### Example 2

```text
Input: deliciousness = [1,1,1,3,3,3,7]
Output: 15
Explanation: The good meals are (1,1) with 3 ways, (1,3) with 9 ways, and
(1,7) with 3 ways.
```

### Constraints

- `1 <= deliciousness.length <= 10⁵`
- `0 <= deliciousness[i] <= 2²⁰`

## Hints

### Hint 1

Note that the number of powers of 2 is at most 21, so this turns the problem
into a classic "find the number of pairs that sum to a certain value", but
for 21 values.

### Hint 2

You need to use something faster than the N log N approach, since there is
already the log of iterating over the powers; one idea is two pointers.
