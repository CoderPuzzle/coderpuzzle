# Calculate Amount Paid in Taxes

## Description

You are given a 0-indexed 2D integer array brackets where brackets[i] =
[upperᵢ, percentᵢ] means that the ith tax bracket has an upper bound of
upperᵢ and is taxed at a rate of percentᵢ. The brackets are sorted by upper
bound (i.e. upperᵢ₋₁ < upperᵢ for 0 < i < brackets.length).

Tax is calculated as follows:

- The first upper₀ dollars earned are taxed at a rate of percent₀.
- The next upper₁ - upper₀ dollars earned are taxed at a rate of percent₁.
- The next upper₂ - upper₁ dollars earned are taxed at a rate of percent₂.
- And so on.

You are given an integer income representing the amount of money you earned.
Return the amount of money that you have to pay in taxes. Answers within
10⁻⁵ of the actual answer will be accepted.

### Example 1

```text
Input: brackets = [[3,50],[7,10],[12,25]], income = 10
Output: 2.65000
Explanation:
Based on your income, you have 3 dollars in the 1st tax bracket, 4 dollars in the 2nd tax bracket, and 3 dollars in the 3rd tax bracket.
The tax rate for the three tax brackets is 50%, 10%, and 25%, respectively.
In total, you pay $3 * 50% + $4 * 10% + $3 * 25% = $2.65 in taxes.
```

### Example 2

```text
Input: brackets = [[1,0],[4,25],[5,50]], income = 2
Output: 0.25000
Explanation:
Based on your income, you have 1 dollar in the 1st tax bracket and 1 dollar in the 2nd tax bracket.
The tax rate for the two tax brackets is 0% and 25%, respectively.
In total, you pay $1 * 0% + $1 * 25% = $0.25 in taxes.
```

### Example 3

```text
Input: brackets = [[2,50]], income = 0
Output: 0.00000
Explanation:
You have no income to tax, so you have to pay a total of $0 in taxes.
```

### Constraints

- `1 <= brackets.length <= 100`
- `1 <= upperᵢ <= 1000`
- `0 <= percentᵢ <= 100`
- `0 <= income <= 1000`
- `upperᵢ` is sorted in ascending order.
- All the values of `upperᵢ` are unique.
- The upper bound of the last tax bracket is greater than or equal to
  `income`.

## Hints

### Hint 1

As you iterate through the tax brackets, keep track of the previous tax bracket’s upper bound in a variable called prev. If there is no previous tax bracket, use 0 instead.

### Hint 2

The amount of money in the ith tax bracket is min(income, upperᵢ) - prev.
