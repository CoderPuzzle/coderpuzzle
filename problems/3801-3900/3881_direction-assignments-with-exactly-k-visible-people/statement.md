# Direction Assignments with Exactly K Visible People

## Description

You are given three integers `n`, `pos`, and `k`.

There are `n` people standing in a line indexed from `0` to `n - 1`. Each
person independently chooses a direction:

- `'L'`: visible only to people on their right
- `'R'`: visible only to people on their left

A person at index `pos` sees others as follows:

- A person `i < pos` is visible if and only if they choose `'L'`.
- A person `i > pos` is visible if and only if they choose `'R'`.

Return the number of possible direction assignments such that the person at
index `pos` sees exactly `k` people.

Since the answer may be large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: n = 3, pos = 1, k = 0
Output: 2
Explanation:
    Index 0 is to the left of pos = 1, and index 2 is to the right of
    pos = 1.
    To see k = 0 people, index 0 must choose 'R' and index 2 must choose
    'L', keeping both invisible.
    The person at index 1 can choose 'L' or 'R' since it does not affect
    the count. Thus, the answer is 2.
```

### Example 2

```text
Input: n = 3, pos = 2, k = 1
Output: 4
Explanation:
    Index 0 and index 1 are left of pos = 2, and there is no index to the
    right.
    To see k = 1 person, exactly one of index 0 or index 1 must choose
    'L', and the other must choose 'R'.
    There are 2 ways to choose which index is visible from the left.
    The person at index 2 can choose 'L' or 'R' since it does not affect
    the count. Thus, the answer is 2 + 2 = 4.
```

### Example 3

```text
Input: n = 1, pos = 0, k = 0
Output: 2
Explanation:
    There are no indices to the left or right of pos = 0.
    To see k = 0 people, no additional condition is required.
    The person at index 0 can choose 'L' or 'R'. Thus, the answer is 2.
```

### Constraints

- `1 <= n <= 10⁵`
- `0 <= pos, k <= n - 1`

## Hints

### Hint 1

Use combinatorics.

### Hint 2

Count the visible people on the left and right independently. Let
`a = pos` and `b = n - pos - 1`.

### Hint 3

To see exactly `k` people, choose `i` visible people from the left side
and `k - i` from the right side.

### Hint 4

Each chosen left person must pick `'L'`, each chosen right person must
pick `'R'`, and every other person can pick either direction.

### Hint 5

Sum over all valid `i`, multiplying the two binomial choices and the free
choices for the remaining people.
