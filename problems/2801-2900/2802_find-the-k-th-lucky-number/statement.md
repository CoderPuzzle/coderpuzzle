# Find The K-th Lucky Number

## Description

We know that 4 and 7 are lucky digits. Also, a number is called lucky if it
contains only lucky digits.

You are given an integer `k`, return the kth lucky number represented as a
string.

### Example 1

```text
Input: k = 4
Output: "47"
Explanation: The first lucky number is 4, the second one is 7, the third one
is 44 and the fourth one is 47.
```

### Example 2

```text
Input: k = 10
Output: "477"
Explanation: Here are lucky numbers sorted in increasing order:
4, 7, 44, 47, 74, 77, 444, 447, 474, 477. So the 10th lucky number is 477.
```

### Example 3

```text
Input: k = 1000
Output: "777747447"
Explanation: It can be shown that the 1000th lucky number is 777747447.
```

### Constraints

- `1 <= k <= 10⁹`

## Hints

### Hint 1

The number of lucky numbers with exactly n digits is equal to 2ⁿ.

### Hint 2

We can obtain how many digits the kth lucky number has.

### Hint 3

Imagine we know that kth lucky number has c digits. Then calculate how many
numbers with c digits exist before the kth lucky number.

### Hint 4

Imagine the number from the previous hint is x. Now look at the binary
representation of x and add some leading zero to make its length equal to c.

### Hint 5

Replace 0 and 1 with 4 and 7 in the number you've obtained from the previous
hint.
