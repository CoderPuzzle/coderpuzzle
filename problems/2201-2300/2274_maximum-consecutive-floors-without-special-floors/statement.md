# Maximum Consecutive Floors Without Special Floors

## Description

Alice manages a company and has rented some floors of a building as office
space. Alice has decided some of these floors should be special floors, used
for relaxation only.

You are given two integers `bottom` and `top`, which denote that Alice has
rented all the floors from `bottom` to `top` (inclusive). You are also given
the integer array `special`, where `special[i]` denotes a special floor that
Alice has designated for relaxation.

Return the maximum number of consecutive floors without a special floor.

### Example 1

```text
Input: bottom = 2, top = 9, special = [4,6]
Output: 3
Explanation: The following are the ranges (inclusive) of consecutive floors without a special floor:
- (2, 3) with a total amount of 2 floors.
- (5, 5) with a total amount of 1 floor.
- (7, 9) with a total amount of 3 floors.
Therefore, we return the maximum number which is 3 floors.
```

### Example 2

```text
Input: bottom = 6, top = 8, special = [7,6,8]
Output: 0
Explanation: Every floor rented is a special floor, so we return 0.
```

### Constraints

- `1 <= special.length <= 10⁵`
- `1 <= bottom <= special[i] <= top <= 10⁹`
- All the values of `special` are unique.

## Hints

### Hint 1

Say we have a pair of special floors (x, y) with no other special floors in between. There are x - y - 1 consecutive floors in between them without a special floor.

### Hint 2

Say there are n special floors. After sorting special, we have answer = max(answer, special[i] – special[i – 1] – 1) for all 0 < i < n.

### Hint 3

However, there are two special cases left to consider: the floors before special[0] and after special[n-1].

### Hint 4

To consider these cases, we have answer = max(answer, special[0] – bottom, top – special[n-1]).
