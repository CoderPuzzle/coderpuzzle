# Maximum Number of Balloons

## Description

Given a string text, you want to use the characters of text to form as many
instances of the word "balloon" as possible.

You can use each character in `text` at most once. Return the maximum
number of instances that can be formed.

### Example 1

![diagram](figures/1189-1.svg)

```text
Input: text = "nlaebolko"
Output: 1
```

### Example 2

![diagram](figures/1189-2.svg)

```text
Input: text = "loonbalxballpoon"
Output: 2
```

### Example 3

```text
Input: text = "leetcode"
Output: 0
```

### Constraints

- `1 <= text.length <= 10⁴`
- `text` consists of lower case English letters only.

## Hints

### Hint 1

Count the frequency of letters in the given string.

### Hint 2

Find the letter than can make the minimum number of instances of the word
"balloon".
