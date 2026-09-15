# Library Late Fee Calculator

## Description

A library charges an overdue fee on every late book under a tiered schedule.
You are given an integer array `daysLate`, where `daysLate[i]` is how many
days late the i-th book was returned. The fee for one book is:

- `1` if it was returned exactly one day late;
- `2 * daysLate[i]` if it was returned two through five days late, inclusive;
- `3 * daysLate[i]` if it was returned more than five days late.

Return the total fee summed over all books.

### Example 1

```text
Input: daysLate = [5,1,7]
Output: 32
Explanation: The first book was five days late and owes 2 * 5 = 10; the
second was one day late and owes the flat 1; the third was seven days late
and owes 3 * 7 = 21. The total is 10 + 1 + 21 = 32.
```

### Example 2

```text
Input: daysLate = [1,1]
Output: 2
Explanation: Each book owes the flat one-day fee of 1, so the total is
1 + 1 = 2.
```

### Constraints

- `1 <= daysLate.length <= 100`
- `1 <= daysLate[i] <= 100`

## Hints

### Hint 1

Walk the array once and apply the three fee tiers exactly as described,
adding each book's fee to a running total.
