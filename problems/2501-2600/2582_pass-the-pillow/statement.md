# Pass the Pillow

## Description

There are `n` people standing in a line labeled from 1 to `n`. The first
person in the line is holding a pillow initially. Every second, the person
holding the pillow passes it to the next person standing in the line. Once
the pillow reaches the end of the line, the direction changes, and people
continue passing the pillow in the opposite direction.

- For example, once the pillow reaches the nth person they pass it to the
  n - 1th person, then to the n - 2th person and so on.

Given the two positive integers `n` and `time`, return the index of the
person holding the pillow after `time` seconds.

### Example 1

```text
Input: n = 4, time = 5
Output: 2
Explanation: People pass the pillow in the following way:
1 -> 2 -> 3 -> 4 -> 3 -> 2.
After five seconds, the 2nd person is holding the pillow.
```

### Example 2

```text
Input: n = 3, time = 2
Output: 3
Explanation: People pass the pillow in the following way: 1 -> 2 -> 3.
After two seconds, the 3rd person is holding the pillow.
```

### Constraints

- `2 <= n <= 1000`
- `1 <= time <= 1000`

### Note

This question is the same as `3178`: Find the Child Who Has the Ball After K Seconds.

## Hints

### Hint 1

Maintain two integer variables, direction and i, where direction denotes the
current direction in which the pillow should pass, and i denotes an index of
the person holding the pillow.

### Hint 2

While time is positive, update the current index with the current direction.
If the index reaches the end of the line, multiply direction by - 1.
