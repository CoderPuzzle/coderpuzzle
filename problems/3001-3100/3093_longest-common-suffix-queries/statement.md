# Longest Common Suffix Queries

## Description

You are given two arrays of strings `wordsContainer` and `wordsQuery`.

For each `wordsQuery[i]`, you need to find a string from `wordsContainer` that
has the longest common suffix with `wordsQuery[i]`. If there are two or more
strings in `wordsContainer` that share the longest common suffix, find the
string that is the smallest in length. If there are two or more such strings
that have the same smallest length, find the one that occurred earlier in
`wordsContainer`.

Return an array of integers `ans`, where `ans[i]` is the index of the string
in `wordsContainer` that has the longest common suffix with `wordsQuery[i]`.

### Example 1

```text
Input: wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]
Output: [1,1,1]
Explanation:
For wordsQuery[0] = "cd", the strings sharing the longest common suffix "cd"
are at indices 0, 1, and 2. The answer is index 1 because it has the shortest
length of 3.
For wordsQuery[1] = "bcd", the strings sharing the longest common suffix "bcd"
are at indices 0, 1, and 2. The answer is index 1 because it has the shortest
length of 3.
For wordsQuery[2] = "xyz", no string shares a common suffix, so the longest
common suffix is "". This is shared by indices 0, 1, and 2. The answer is
index 1 because it has the shortest length of 3.
```

### Example 2

```text
Input: wordsContainer = ["abcdefgh","poiuygh","ghghgh"], wordsQuery = ["gh","acbfgh","acbfegh"]
Output: [2,0,2]
Explanation:
For wordsQuery[0] = "gh", the strings sharing the longest common suffix "gh"
are at indices 0, 1, and 2. The answer is index 2 because it has the shortest
length of 6.
For wordsQuery[1] = "acbfgh", only index 0 shares the longest common suffix
"fgh". Hence it is the answer, even though index 2 is shorter.
For wordsQuery[2] = "acbfegh", the strings sharing the longest common suffix
"gh" are at indices 0, 1, and 2. The answer is index 2 because it has the
shortest length of 6.
```

### Constraints

- `1 <= wordsContainer.length, wordsQuery.length <= 10⁴`
- `1 <= wordsContainer[i].length <= 5 * 10³`
- `1 <= wordsQuery[i].length <= 5 * 10³`
- `wordsContainer[i]` and `wordsQuery[i]` consist of lowercase English letters and digits.
- The sum of `wordsContainer[i].length` is at most `5 * 10⁵`.
- The sum of `wordsQuery[i].length` is at most `5 * 10⁵`.

## Hints

### Hint 1

If we reverse the strings, the problem changes to finding the longest common prefix.

### Hint 2

Build a Trie, where each node is a letter and only saves the best word's index in each node, based on the criteria.
