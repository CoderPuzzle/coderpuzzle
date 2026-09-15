# Minimum Number of Chairs in a Waiting Room

## Description

You are given a string s. Simulate events at each second i:

- If s[i] == 'E', a person enters the waiting room and takes one of the
  chairs in it.
- If s[i] == 'L', a person leaves the waiting room, freeing up a chair.

Return the minimum number of chairs needed so that a chair is available for
every person who enters the waiting room given that it is initially empty.

### Example 1

```text
Input: s = "EEEEEEE"
Output: 7
Explanation: After each second, a person enters the waiting room and no person leaves it. Therefore, a minimum of 7 chairs is needed.
```

### Example 2

```text
Input: s = "ELELEEL"
Output: 2
Explanation: Let's consider that there are 2 chairs in the waiting room. The table below shows the state of the waiting room at each second.
```

### Example 3

```text
Input: s = "ELEELEELLL"
Output: 3
Explanation: Let's consider that there are 3 chairs in the waiting room. The table below shows the state of the waiting room at each second.
```

### Constraints

- `1 <= s.length <= 50`
- `s` consists only of the letters 'E' and 'L'.
- `s` represents a valid sequence of entries and exits.

## Hints

### Hint 1

Iterate from left to right over the string and keep track of the number of people in the waiting room using a variable that you will increment on every occurrence of ‘E’ and decrement on every occurrence of ‘L’.

### Hint 2

The answer is the maximum number of people in the waiting room at any instance.
