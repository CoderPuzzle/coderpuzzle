# Minimum Number of Groups to Create a Valid Assignment

## Description

You are given a collection of numbered balls and instructed to sort them
into boxes for a nearly balanced distribution. There are two rules you must
follow:

- Balls with the same box must have the same value. But, if you have more
  than one ball with the same number, you can put them in different boxes.
- The biggest box can only have one more ball than the smallest box.

Return the fewest number of boxes to sort these balls following these rules.

### Example 1

```text
Input: balls = [3,2,3,2,3]
Output: 2
Explanation: We can sort balls into boxes as follows:
- [3,3,3]
- [2,2]
The size difference between the two boxes doesn't exceed one.
```

### Example 2

```text
Input: balls = [10,10,10,3,1,1]
Output: 4
Explanation: We can sort balls into boxes as follows:
- [10]
- [10,10]
- [3]
- [1,1]
You can't use fewer than four boxes while still following the rules. For
example, putting all three balls numbered 10 in one box would break the
rule about the maximum size difference between boxes.
```

### Constraints

- `1 <= balls.length <= 10⁵`
- `1 <= balls[i] <= 10⁹`

## Hints

### Hint 1

Calculate the frequency of each number.

### Hint 2

For each x in the range [1, minimum_frequency], try to create groups with
either x or x + 1 indices assigned to them while minimizing the total
number of groups.

### Hint 3

For each distinct number, using its frequency, check that all its
occurrences can be assigned to groups of size x or x + 1 while minimizing
the number of groups used.

### Hint 4

To get the minimum number of groups needed for a number having frequency f
to be assigned to groups of size x or x + 1, let a = f / (x + 1) and
b = f % (x + 1). If b == 0, then we can simply create a groups of size
x + 1. If x - b ≤ a, we can have a - (x - b) groups of size x + 1 and
x - b + 1 groups of size x. So, in total, we have a + 1 groups. Otherwise,
it's impossible.

### Hint 5

The minimum number of groups needed for some x is the total minimized
number of groups needed for each distinct number.

### Hint 6

The answer is the minimum number of groups needed for each x in the range
[1, minimum_frequency].
