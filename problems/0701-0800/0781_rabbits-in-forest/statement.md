# Rabbits in Forest

## Description

A forest holds an unknown number of rabbits. We asked `n` of them "How many
other rabbits have the same color as you?" and collected the answers in the
integer array `answers`, where `answers[i]` is the answer of the `i`th rabbit.

A rabbit that answers `k` is saying its color group holds exactly `k + 1`
rabbits: itself plus `k` others. Two rabbits that give different answers can
never share a color, while every rabbit that shares a color gives the same
answer. A group may also contain rabbits that were never asked.

Given `answers`, return the minimum number of rabbits that could be in the
forest.

### Example 1

```text
Input: answers = [1,1,2]
Output: 5
Explanation: The two rabbits that answered "1" could both be the same color,
say red. The rabbit that answered "2" can't be red or the answers would be
inconsistent. Say the rabbit that answered "2" was blue. Then there should
be 2 other blue rabbits in the forest that didn't answer into the array.
The smallest possible number of rabbits in the forest is therefore 5: 3 that
answered plus 2 that didn't.
```

### Example 2

```text
Input: answers = [10,10,10]
Output: 11
```

### Constraints

- `1 <= answers.length <= 1000`
- `0 <= answers[i] < 1000`
