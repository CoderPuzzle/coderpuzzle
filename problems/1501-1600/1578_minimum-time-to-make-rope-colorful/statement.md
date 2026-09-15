# Minimum Time to Make Rope Colorful

## Description

Alice has `n` balloons strung along a rope. You are given a 0-indexed
string `colors`, where `colors[i]` is the color of the `i`th balloon,
and a 0-indexed integer array `neededTime`, where `neededTime[i]` is
the number of seconds Bob needs to remove the `i`th balloon.

Alice wants the rope to be colorful: no two consecutive balloons may
share the same color. Bob can remove balloons to make that happen.
Return the minimum total number of seconds Bob needs to spend removing
balloons so that no two consecutive balloons on the rope have the same
color.

### Example 1

![diagram](figures/1578-1.svg)

```text
Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: Bob can remove the balloon at index 2 ('a'), which takes 3
seconds. There are no longer two consecutive balloons of the same
color. Total time = 3.
```

### Example 2

![diagram](figures/1578-2.svg)

```text
Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: The rope is already colorful. Bob does not need to remove
any balloons.
```

### Example 3

![diagram](figures/1578-3.svg)

```text
Input: colors = "aabaa", neededTime = [1,2,3,4,1]
Output: 2
Explanation: Bob removes the balloons at indices 0 and 4, each taking
1 second. There are no longer two consecutive balloons of the same
color. Total time = 1 + 1 = 2.
```

### Constraints

- `n == colors.length == neededTime.length`
- `1 <= n <= 10^5`
- `1 <= neededTime[i] <= 10^4`
- `colors` contains only lowercase English letters.

## Hints

### Hint 1

Maintain the running sum and max value for repeated letters.
