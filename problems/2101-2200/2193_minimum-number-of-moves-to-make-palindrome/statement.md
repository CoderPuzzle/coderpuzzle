# Minimum Number of Moves to Make Palindrome

## Description

You are given a string `s` consisting only of lowercase English letters.

In one move, you can select any two adjacent characters of `s` and swap them.

Return the minimum number of moves needed to make `s` a palindrome.

Note that the input will be generated such that `s` can always be converted
to a palindrome.

### Example 1

```text
Input: s = "aabb"
Output: 2
Explanation:
We can obtain two palindromes from s, "abba" and "baab".
- We can obtain "abba" from s in 2 moves: "aabb" -> "abab" -> "abba".
- We can obtain "baab" from s in 2 moves: "aabb" -> "abab" -> "baab".
Thus, the minimum number of moves needed to make s a palindrome is 2.
```

### Example 2

```text
Input: s = "letelt"
Output: 2
Explanation:
One of the palindromes we can obtain from s in 2 moves is "lettel".
One of the ways we can obtain it is "letelt" -> "letetl" -> "lettel".
Other palindromes such as "tleelt" can also be obtained in 2 moves.
It can be shown that it is not possible to obtain a palindrome in less than 2 moves.
```

### Constraints

- `1 <= s.length <= 2000`
- `s` consists only of lowercase English letters.
- `s` can be converted to a palindrome using a finite number of moves.

## Hints

### Hint 1

Consider a greedy strategy: start by making the leftmost and rightmost characters match using the minimum number of swaps.

### Hint 2

Once the outer pair matches, delete the leftmost and rightmost characters and solve the remaining string recursively.

### Hint 3

If the leftmost character has no matching partner on the right side, it is the middle character of the palindrome — swap it one step toward the center and retry.
