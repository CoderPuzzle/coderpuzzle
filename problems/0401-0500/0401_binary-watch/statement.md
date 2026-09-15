# Binary Watch

## Description

A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs on the bottom to represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.

For example, the below binary watch reads "4:51".

![diagram](figures/401-1.svg)

```text
Hours:    8  4  2  1         0 1 0 0
Minutes: 32 16  8  4  2  1   1 1 0 0 1 1
```

Given an integer `turnedOn` which represents the number of LEDs that are currently on (ignoring the PM), return all possible times the watch could represent.

Return the times in the order the examples show: the hours ascend `0` through `11` as the outer order and, within each hour, the minutes ascend `0` through `59` — equivalently, the list is sorted by time of day.

The hour must not contain a leading zero. For example, "01:00" is not valid. It should be "1:00".

The minute must consist of two digits and may contain a leading zero. For example, "10:2" is not valid. It should be "10:02".

### Example 1

```text
Input: turnedOn = 1
Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
```

### Example 2

```text
Input: turnedOn = 9
Output: []
```

### Constraints

- `0 <= turnedOn <= 10`

## Hints

### Hint 1

Simplify by seeking for solutions that involve comparing set bit counts.

### Hint 2

Consider precomputing all possible times for comparison.
