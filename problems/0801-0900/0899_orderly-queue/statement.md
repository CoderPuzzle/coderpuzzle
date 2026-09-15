# Orderly Queue

## Description

You are given a string `s` and an integer `k`. You can choose one of the
first `k` letters of `s` and append it at the end of the string.

Return the lexicographically smallest string you could have after applying
the mentioned step any number of moves.

### Example 1

```text
Input: s = "cba", k = 1
Output: "acb"
Explanation: In the first move, we move the 1st character 'c' to the end,
obtaining the string "bac". In the second move, we move the 1st character
'b' to the end, obtaining the final result "acb".
```

### Example 2

```text
Input: s = "baaca", k = 3
Output: "aaabc"
Explanation: In the first move, we move the 1st character 'b' to the end,
obtaining the string "aacab". In the second move, we move the 3rd character
'c' to the end, obtaining the final result "aaabc".
```

### Constraints

- `1 <= k <= s.length <= 1000`
- `s` consists of lowercase English letters.
