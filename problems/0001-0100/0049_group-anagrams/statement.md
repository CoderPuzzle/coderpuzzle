# Group Anagrams

## Description

Given an array of strings `strs`, group **the anagrams** together. You can
return the answer in any order.

An **Anagram** is a word or phrase formed by rearranging the letters of a
different word or phrase, typically using all the original letters exactly
once.

### Example 1

```text
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Explanation:
There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams.
```

### Example 2

```text
Input: strs = [""]
Output: [[""]]
```

### Example 3

```text
Input: strs = ["a"]
Output: [["a"]]
```

### Constraints

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

## Hints

### Hint 1

Two strings are anagrams exactly when their sorted character sequences are identical.

### Hint 2

Map each string to its sorted form (or a 26-slot character count) and use that as a hash key to collect groups.

### Hint 3

A character-count key avoids the O(L log L) sort per string.
