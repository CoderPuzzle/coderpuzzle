# Partition String

## Description

Given a string `s`, partition it into unique segments according to the
following procedure:

- Start building a segment beginning at index 0.
- Continue extending the current segment character by character until the
  current segment has not been seen before.
- Once the segment is unique, add it to your list of segments, mark it as
  seen, and begin a new segment from the next index.
- Repeat until you reach the end of `s`.

Return an array of strings `segments`, where `segments[i]` is the `ith`
segment created.

### Example 1

```text
Input: s = "abbccccd"
Output: ["a","b","bc","c","cc","d"]
Explanation: "a" and "b" are new when they are built, so each becomes a
segment; the next "b" repeats one, so it extends to "bc"; "c" is new; the
next "c" repeats one, so it extends to "cc"; and "d" is new. Hence, the
final output is ["a", "b", "bc", "c", "cc", "d"].
```

### Example 2

```text
Input: s = "aaaa"
Output: ["a","aa"]
Explanation: "a" is new; the next "a" repeats one, so it extends to the
new "aa"; the final "a" repeats one as the string ends, leaving the seen
segments unchanged. Hence, the final output is ["a", "aa"].
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Simulate as described
