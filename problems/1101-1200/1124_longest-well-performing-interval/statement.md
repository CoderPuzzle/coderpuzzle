# Longest Well-Performing Interval

## Description

We are given `hours`, a list of the number of hours worked per day for a given
employee.

A day is considered to be a **tiring day** if and only if the number of hours
worked is (strictly) greater than `8`.

A **well-performing interval** is an interval of days for which the number of
tiring days is strictly larger than the number of non-tiring days.

Return the length of the longest well-performing interval.

### Example 1

```text
Input: hours = [9,9,6,0,6,6,9]
Output: 3
Explanation: The longest well-performing interval is [9,9,6].
```

### Example 2

```text
Input: hours = [6,6,6]
Output: 0
```

### Constraints

- `1 <= hours.length <= 10^4`
- `0 <= hours[i] <= 16`

## Hints

### Hint 1

Transform hours into +1/-1 values (tiring day or not); the goal is the longest subarray with strictly positive sum.

### Hint 2

Use prefix sums: for each j, find the smallest i with prefix[j] - prefix[i] > 0, which means prefix[i] == prefix[j] - 1.

### Hint 3

Store the first index at which each prefix value appears in a hash map.
