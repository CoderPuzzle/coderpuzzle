# Long Pressed Name

## Description

Your friend is typing his name on a keyboard. Sometimes, when typing a
character `c`, the key might get long pressed, and the character will be
typed one or more times instead of once.

You examine the typed characters of the keyboard. Return `true` if it is
possible that it was your friend's `name`, with some characters (possibly
none) being long pressed.

### Example 1

```text
Input: name = "alex", typed = "aaleex"
Output: true
Explanation: 'a' and 'e' in 'alex' were long pressed.
```

### Example 2

```text
Input: name = "saeed", typed = "ssaaedd"
Output: false
Explanation: 'e' must have been pressed twice, but it was not in the typed output.
```

### Constraints

- `1 <= name.length, typed.length <= 1000`
- `name` and `typed` consist of only lowercase English letters.
