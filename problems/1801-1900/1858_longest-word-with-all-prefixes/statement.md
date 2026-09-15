# Longest Word With All Prefixes

## Description

Given an array of strings `words`, find the longest string in `words`
such that every prefix of it is also in `words`.

- For example, let `words = ["a", "app", "ap"]`. The string `"app"` has
  prefixes `"ap"` and `"a"`, all of which are in words.

Return the string described above. If there is more than one string with
the same length, return the lexicographically smallest one, and if no
string exists, return `""`.

### Example 1

```text
Input: words = ["k","ki","kir","kira", "kiran"]
Output: "kiran"
Explanation: "kiran" has prefixes "kira", "kir", "ki", and "k", and all
of them appear in words.
```

### Example 2

```text
Input: words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
Output: "apple"
Explanation: Both "apple" and "apply" have all their prefixes in words.
However, "apple" is lexicographically smaller, so we return that.
```

### Example 3

```text
Input: words = ["abc", "bc", "ab", "qwe"]
Output: ""
```

### Constraints

- `1 <= words.length <= 10⁵`
- `1 <= words[i].length <= 10⁵`
- `1 <= sum(words[i].length) <= 10⁵`
- `words[i]` consists only of lowercase English letters.

## Hints

### Hint 1

Add all the words to a trie.

### Hint 2

Check the longest path where all the nodes are words.
