# Slowest Key

## Description

A newly designed keypad was tested by pressing a sequence of `n` keys, one
at a time.

You are given a string `keysPressed` of length `n`, where `keysPressed[i]`
was the `i`th key pressed in the testing sequence, and a sorted array
`releaseTimes` of length `n`, where `releaseTimes[i]` was the time the
`i`th key was released. Both are 0-indexed. The 0th key was pressed at
time `0`, and every subsequent key was pressed at the exact moment the
previous key was released.

The duration of the `i`th keypress is `releaseTimes[i] - releaseTimes[i - 1]`,
and the duration of the 0th keypress is `releaseTimes[0]`.

Note that the same key could have been pressed multiple times during the
test, and different presses of the same key are not required to have the
same duration.

Return the key of the keypress that had the longest duration. If multiple
keypresses tie for the longest duration, return the lexicographically
largest key among them.

### Example 1

```text
Input: releaseTimes = [9,29,49,50], keysPressed = "cbcd"
Output: "c"
Explanation: The keypresses were as follows:
Keypress for 'c' had a duration of 9 (pressed at time 0, released at time 9).
Keypress for 'b' had a duration of 29 - 9 = 20 (pressed right after 'c'
released, at time 9, released at time 29).
Keypress for 'c' had a duration of 49 - 29 = 20 (pressed right after 'b'
released, at time 29, released at time 49).
Keypress for 'd' had a duration of 50 - 49 = 1 (pressed right after 'c'
released, at time 49, released at time 50).
The longest duration is 20, shared by 'b' and the second 'c'. 'c' is
lexicographically larger than 'b', so the answer is "c".
```

### Example 2

```text
Input: releaseTimes = [12,23,36,46,62], keysPressed = "spuda"
Output: "a"
Explanation: The keypresses were as follows:
Keypress for 's' had a duration of 12.
Keypress for 'p' had a duration of 23 - 12 = 11.
Keypress for 'u' had a duration of 36 - 23 = 13.
Keypress for 'd' had a duration of 46 - 36 = 10.
Keypress for 'a' had a duration of 62 - 46 = 16.
The longest duration is 16, for 'a', so the answer is "a".
```

### Constraints

- `releaseTimes.length == n`
- `keysPressed.length == n`
- `2 <= n <= 1000`
- `1 <= releaseTimes[i] <= 10⁹`
- `releaseTimes[i] < releaseTimes[i + 1]`
- `keysPressed` contains only lowercase English letters.

## Hints

### Hint 1

Get for each press its key and the amount of time it took.

### Hint 2

Iterate over the presses, maintaining the answer so far.

### Hint 3

The current press changes the answer if and only if its duration is
strictly longer than that of the current answer, or the durations are
equal but its key is lexicographically larger than that of the current
answer.
