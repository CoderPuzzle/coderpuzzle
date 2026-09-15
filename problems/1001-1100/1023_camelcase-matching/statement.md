# Camelcase Matching

## Description

Given an array of strings `queries` and a string `pattern`, return a
boolean array `answer` where `answer[i]` is `true` if `queries[i]`
matches `pattern`, and `false` otherwise.

A query word `queries[i]` matches `pattern` if you can insert lowercase
English letters into `pattern` so that it equals the query. You may
insert a character at any position in `pattern` or you may choose not to
insert any characters at all.

### Example 1

```text
Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"
Output: [true,false,true,true,false]
Explanation: "FooBar" can be generated like this "F" + "oo" + "B" + "ar".
"FootBall" can be generated like this "F" + "oot" + "B" + "all".
"FrameBuffer" can be generated like this "F" + "rame" + "B" + "uffer".
```

### Example 2

```text
Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBa"
Output: [true,false,true,false,false]
Explanation: "FooBar" can be generated like this "Fo" + "o" + "Ba" + "r".
"FootBall" can be generated like this "Fo" + "ot" + "Ba" + "ll".
```

### Example 3

```text
Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBaT"
Output: [false,true,false,false,false]
Explanation: "FooBarTest" can be generated like this "Fo" + "o" + "Ba" + "r" + "T" + "est".
```

### Constraints

- `1 <= pattern.length, queries.length <= 100`
- `1 <= queries[i].length <= 100`
- `queries[i]` and `pattern` consist of English letters.

## Hints

### Hint 1

Given a single pattern and word, how can we solve it?

### Hint 2

One way to do it is using a DP `(pos1, pos2)` where `pos1` is a pointer to
the word and `pos2` to the pattern and returns true if we can match the
pattern with the given word.

### Hint 3

We have two scenarios: The first one is when `word[pos1] == pattern[pos2]`,
then the transition will be just `DP(pos1 + 1, pos2 + 1)`. The second
scenario is when `word[pos1]` is lowercase then we can add this character
to the pattern so that the transition is just `DP(pos1 + 1, pos2)` The
case base is `if (pos1 == n && pos2 == m) return true;` Where `n` and `m`
are the sizes of the strings word and pattern respectively.
