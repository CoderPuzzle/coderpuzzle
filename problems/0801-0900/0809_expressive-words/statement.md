# Expressive Words

## Description

Sometimes people repeat letters to represent extra feeling: `"hello"`
becomes `"heeellooo"`, and `"hi"` becomes `"hiiii"`. In a string like
`"heeellooo"`, the adjacent equal letters form groups: `"h"`, `"eee"`,
`"ll"`, `"ooo"`.

You are given a string `s` and an array of query strings `words`. A query
word is **stretchy** if it can be made to be equal to `s` by any number of
applications of the following extension operation: choose a group
consisting of characters `c`, and add some number of characters `c` to the
group so that the size of the group is three or more.

For example, starting with `"hello"`, an extension on the group `"o"` gives
`"hellooo"`, but we cannot get `"helloo"` since the group `"oo"` would have
a size less than three. We could also extend `"ll"` to `"lllll"` to get
`"helllllooo"`. If `s = "helllllooo"`, the query word `"hello"` is stretchy
because of these two extension operations: `"hello"` -> `"hellooo"` ->
`"helllllooo"` = `s`.

Return the number of query strings that are stretchy.

### Example 1

```text
Input: s = "heeellooo", words = ["hello","hi","helo"]
Output: 1
Explanation: We can extend "e" and "o" in the word "hello" to get "heeellooo".
We can't extend "helo" to get "heeellooo" because the group "ll" is not size 3 or more.
```

### Example 2

```text
Input: s = "zzzzzyyyyy", words = ["zzyy","zy","zyy"]
Output: 3
```

### Constraints

- `1 <= s.length, words.length <= 100`
- `1 <= words[i].length <= 100`
- `s` and `words[i]` consist of lowercase letters.
