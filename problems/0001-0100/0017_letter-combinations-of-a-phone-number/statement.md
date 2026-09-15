# Letter Combinations of a Phone Number

## Description

Given a string containing digits from `2`-`9` inclusive, return all possible letter combinations that the number could represent.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![diagram](figures/17-1.svg)

```text
2 abc    3 def
4 ghi    5 jkl    6 mno
7 pqrs   8 tuv    9 wxyz
```

Return the combinations in the order the examples show: the letters chosen for earlier digits vary slowest, so combinations sharing their first letters are consecutive. An empty `digits` has no combinations to represent; the answer for `""` is `[]`.

### Example 1

```text
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Example 2

```text
Input: digits = "2"
Output: ["a","b","c"]
```

### Constraints

- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`.
