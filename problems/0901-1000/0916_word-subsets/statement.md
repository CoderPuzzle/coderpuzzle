# Word Subsets

## Description

You are given two string arrays `words1` and `words2`.

A string `b` is a subset of a string `a` if every letter in `b` occurs in
`a` including multiplicity — `b` never asks for a letter more times than
`a` holds it. For example, `"wrr"` is a subset of `"warrior"`, but is not a
subset of `"world"`.

A string `a` from `words1` is universal if for every string `b` in
`words2`, `b` is a subset of `a`.

Return an array of all the universal strings in `words1`, in the order they
appear in `words1`.

### Example 1

```text
Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
Output: ["facebook","google","leetcode"]
Explanation: facebook, google and leetcode each hold both an "e" and an "o"; amazon has no "e" and apple has no "o".
```

### Example 2

```text
Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["lc","eo"]
Output: ["leetcode"]
Explanation: The requirements add up to one "l", one "c", one "e" and one "o"; leetcode holds all four, and every other word misses at least one of them.
```

### Example 3

```text
Input: words1 = ["acaac","cccbb","aacbb","caacc","bcbbb"], words2 = ["c","cc","b"]
Output: ["cccbb"]
Explanation: The b's together demand at least two "c" and one "b"; only cccbb meets both demands.
```

### Constraints

- `1 <= words1.length, words2.length <= 10⁴`
- `1 <= words1[i].length, words2[i].length <= 10`
- `words1[i]` and `words2[i]` consist only of lowercase English letters.
- All the strings of `words1` are unique.
