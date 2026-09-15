# Airplane Seat Assignment Probability

## Description

`n` passengers board an airplane with exactly `n` seats. The first passenger
has lost the ticket and picks a seat randomly. But after that, the rest of the
passengers will:

- Take their own seat if it is still available, and
- Pick other seats randomly when they find their seat occupied

Return the probability that the `nth` person gets his own seat.

### Example 1

```text
Input: n = 1
Output: 1.00000
Explanation: The first person can only get the first seat.
```

### Example 2

```text
Input: n = 2
Output: 0.50000
Explanation: The second person has a probability of 0.5 to get the second seat (when first person gets the first seat).
```

### Constraints

- `1 <= n <= 10⁵`

## Hints

### Hint 1

Let `f(n)` denote the probability of the n-th person getting correct seat in
n-person case, then:

`f(1) = 1` (base case, trivial)
`f(2) = 1/2` (also trivial)

### Hint 2

Try to calculate `f(3)`, `f(4)`, and `f(5)` using the base cases. What is the
value of them? `f(i)` for `i >= 2` will also be `1/2`.

### Hint 3

Try to prove why `f(i) = 1/2` for `i >= 2`.
