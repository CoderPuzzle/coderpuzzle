# Closest Fair Integer

## Description

You are given a positive integer n.

We call an integer k fair if the number of even digits in k is equal to the
number of odd digits in it.

Return the smallest fair integer that is greater than or equal to n.

### Example 1

```text
Input: n = 2
Output: 10
Explanation: The smallest fair integer that is greater than or equal to 2 is 10.
10 is fair because it has an equal number of even and odd digits (one odd digit and one even digit).
```

### Example 2

```text
Input: n = 403
Output: 1001
Explanation: The smallest fair integer that is greater than or equal to 403 is 1001.
1001 is fair because it has an equal number of even and odd digits (two odd digits and two even digits).
```

### Constraints

- `1 <= n <= 10⁹`

## Hints

### Hint 1

Suppose that the number that we are looking for has the same number of
digits as n, the answer, in this case, will not be very far from n, so you
can do a simple brute force. Can you prove why this is true?

### Hint 2

How do you handle the case when the resulting number has more digits than
n?
