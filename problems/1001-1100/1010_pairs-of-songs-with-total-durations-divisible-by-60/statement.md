# Pairs of Songs With Total Durations Divisible by 60

## Description

You are given a list of songs where the `ith` song has a duration of
`time[i]` seconds.

Return the number of pairs of songs for which their total duration in seconds
is divisible by `60`. Formally, we want the number of indices `i`, `j` such
that `i < j` with `(time[i] + time[j]) % 60 == 0`.

### Example 1

```text
Input: time = [30,20,150,100,40]
Output: 3
Explanation: Three pairs have a total duration divisible by 60:
(time[0] = 30, time[2] = 150): total duration 180
(time[1] = 20, time[3] = 100): total duration 120
(time[1] = 20, time[4] = 40): total duration 60
```

### Example 2

```text
Input: time = [60,60,60]
Output: 3
Explanation: All three pairs have a total duration of 120, which is divisible by 60.
```

### Constraints

- `1 <= time.length <= 6 * 10^4`
- `1 <= time[i] <= 500`

## Hints

### Hint 1

We only need to consider each song length modulo 60.

### Hint 2

Count the number of songs having the same (length % 60) in an array of size 60.

### Hint 3

For remainder 0 (and remainder 30), pairs come from the same bucket: choose 2 among them.
