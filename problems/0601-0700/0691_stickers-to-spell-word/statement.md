# Stickers to Spell Word

## Description

We are given `n` different types of stickers, where `stickers[i]` is a
lowercase English word. You would like to spell out the given string
`target` by cutting individual letters from your collection of stickers
and rearranging them.

You can use each sticker more than once if you want, and you have infinite
quantities of each sticker.

Return the minimum number of stickers that you need to spell out `target`.
If the task is impossible, return `-1`.

### Example 1

```text
Input: stickers = ["with","example","science"], target = "thehat"
Output: 3
Explanation: We can use 2 "with" stickers, and 1 "example" sticker.
After cutting and rearrange the letters of those stickers, we can form the
target "thehat".
Also, this is the minimum number of stickers necessary to form the target
string.
```

### Example 2

```text
Input: stickers = ["notice","possible"], target = "basicbasic"
Output: -1
Explanation: We cannot form the target "basicbasic" from cutting letters
from the given stickers.
```

### Constraints

- `n == stickers.length`
- `1 <= n <= 50`
- `1 <= stickers[i].length <= 10`
- `1 <= target.length <= 15`
- `stickers[i]` and `target` consist of lowercase English letters.

## Hints

### Hint 1

We want to perform an exhaustive search over the sticker choices, but we
need to speed it up by remembering the states we have already visited.

### Hint 2

For all stickers, we can ignore any letters that are not in the target
word.

### Hint 3

When our candidate answer won't be smaller than an answer we have already
found, we can stop searching this path.

### Hint 4

When a sticker dominates another, we shouldn't include the dominated
sticker in our sticker collection. Here, we say a sticker `A` dominates
`B` if `A.count(letter) >= B.count(letter)` for all letters.
