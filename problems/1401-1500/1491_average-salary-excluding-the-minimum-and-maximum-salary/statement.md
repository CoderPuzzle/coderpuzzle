# Average Salary Excluding the Minimum and Maximum Salary

## Description

You are given an array of unique integers `salary` where `salary[i]` is
the salary of the `i`-th employee.

Return the average salary of employees excluding the minimum and maximum
salary. Answers within `10⁻⁵` of the actual answer will be accepted.

### Example 1

```text
Input: salary = [4000,3000,1000,2000]
Output: 2500.00000
Explanation: The minimum and maximum salaries are 1000 and 4000
respectively. The average excluding them is (2000 + 3000) / 2 = 2500.
```

### Example 2

```text
Input: salary = [1000,2000,3000]
Output: 2000.00000
Explanation: The minimum and maximum salaries are 1000 and 3000
respectively. The average excluding them is (2000) / 1 = 2000.
```

### Constraints

- `3 <= salary.length <= 100`
- `1000 <= salary[i] <= 10⁶`
- All the integers of `salary` are unique.

## Hints

### Hint 1

Get the total sum and subtract the minimum and maximum values in the
array. Finally divide the result by `n - 2`.
