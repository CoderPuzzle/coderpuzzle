# Longest Common Prefix of K Strings After Removal

## Description

You are given an array of strings `words` and an integer `k`.

For each index `i` in the range `[0, words.length - 1]`, find the length of the
longest common prefix among any `k` strings (selected at distinct indices) from
the remaining array after removing the `i`-th element.

Return an array `answer`, where `answer[i]` is the answer for the `i`-th
element. If removing the `i`-th element leaves the array with fewer than `k`
strings, `answer[i]` is `0`.

### Example 1

```text
Input: words = ["jump","run","run","jump","run"], k = 2
Output: [3,4,4,3,4]
Explanation: Removing index 0 leaves ["run","run","jump","run"], and any two "run" share the prefix "run" of length 3. Removing index 1 leaves ["jump","run","jump","run"], and the two "jump" share the prefix "jump" of length 4. The remaining indices are analogous.
```

### Example 2

```text
Input: words = ["dog","racer","car"], k = 2
Output: [0,0,0]
Explanation: Removing any index results in an answer of 0.
```

### Constraints

- `1 <= k <= words.length <= 10^5`
- `1 <= words[i].length <= 10^4`
- `words[i]` consists of lowercase English letters.
- The sum of `words[i].length` is smaller than or equal to `10^5`.

## Hints

### Hint 1

Use a trie to store all the strings initially.

### Hint 2

For each node in the trie, maintain the count of paths ending there.

### Hint 3

For each index i, find the deepest node with at least k paths that does not lie on the path of the removed word.
