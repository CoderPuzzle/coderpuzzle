# Count Houses in a Circular Street

## Description

This is an **interactive** problem.

You are given an object street of class Street that represents a circular
street and a positive integer k which represents a maximum bound for the
number of houses in that street (in other words, the number of houses is less
than or equal to k). Houses' doors could be open or closed initially.

Initially, you are standing in front of a door to a house on this street. Your
task is to count the number of houses in the street.

The class Street contains the following functions which may help you:

- `void openDoor()`: Open the door of the house you are in front of.
- `void closeDoor()`: Close the door of the house you are in front of.
- `boolean isDoorOpen()`: Returns true if the door of the current house is open
  and false otherwise.
- `void moveRight()`: Move to the right house.
- `void moveLeft()`: Move to the left house.

Return ans which represents the number of houses on this street.

**Note (CoderPuzzle):** the signature is `houseCount(street, k)`; the street
arrives as the `Street` object handed to your method, with your starting
position fixed by the input, and every `openDoor`, `closeDoor`,
`isDoorOpen`, `moveRight`, and `moveLeft` call counts against an ample
budget of 1 000 000 operations.

### Example 1

```text
Input: street = [0,0,0,0], k = 10
Output: 4
Explanation: There are 4 houses, and all their doors are closed.
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
- `1 <= n <= k <= 10³`

## Hints

### Hint 1

Close the door of k houses moving in one direction.

### Hint 2

Open the door of the current house.

### Hint 3

Move in one direction and count until you reach the house with the open door.
