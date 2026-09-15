# Count Houses in a Circular Street II

## Description

This is an **interactive** problem.

You are given an object `street` of class `Street` that represents a
circular street and a positive integer `k` which represents a maximum
bound for the number of houses in that street (in other words, the
number of houses is less than or equal to `k`). Houses' doors could be
open or closed initially (at least one is open).

Initially, you are standing in front of a door to a house on this
street. Your task is to count the number of houses in the street.

The class `Street` contains the following functions which may help you:

- `void closeDoor()` — Close the door of the house you are in front of.
- `boolean isDoorOpen()` — Returns true if the door of the current house
  is open and false otherwise.
- `void moveRight()` — Move to the right house.

Note that by circular street, we mean if you number the houses from 1 to
n, then the right house of housei is housei+1 for i < n, and the right
house of housen is house1.

Return `ans` which represents the number of houses on this street.

**Note (CoderPuzzle):** the signature is `houseCount(street, k)`; the street
arrives as the `Street` object handed to your method, with your starting
position fixed by the input, and every `closeDoor`, `isDoorOpen`, and
`moveRight` call counts against an ample budget of 4 000 000 operations.

### Example 1

```text
Input: street = [1,1,1,1], k = 10
Output: 4
Explanation: There are 4 houses, and all their doors are open.
The number of houses is less than k, which is 10.
```

### Example 2

```text
Input: street = [1,0,1,1,0], k = 5
Output: 5
Explanation: There are 5 houses, and the doors of the 1st, 3rd, and 4th
house (moving in the right direction) are open, and the rest are closed.
The number of houses is equal to k, which is 5.
```

### Constraints

- `n == number of houses`
- `1 <= n <= k <= 10⁵`
- `street` is circular by definition provided in the statement.
- The input is generated such that at least one of the doors is open.

## Hints

### Hint 1

First, imagine that there is exactly one open door and try to solve the
problem.

### Hint 2

Now close an opened door.

### Hint 3

Then visit k houses by going right. If there is no open door, your
assumption of having exactly one open door was right, and you have the
answer.

### Hint 4

If there is still an open door, go to step 1.
