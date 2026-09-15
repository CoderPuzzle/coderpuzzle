# Maximum Units on a Truck

## Description

You are assigned to put some amount of boxes onto one truck. You are given a
2D array `boxTypes`, where `boxTypes[i] = [numberOfBoxes_i,
numberOfUnitsPerBox_i]`:

- `numberOfBoxes_i` is the number of boxes of type `i`.
- `numberOfUnitsPerBox_i` is the number of units in each box of type `i`.

You are also given an integer `truckSize`, which is the maximum number of
boxes that can be put on the truck. You can choose any boxes to put on the
truck as long as the number of boxes on it does not exceed `truckSize`.

Return the maximum total number of units that can be put on the truck.

### Example 1

```text
Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
Output: 8
Explanation: There are:
- 1 box of the first type that contains 3 units.
- 2 boxes of the second type that contain 2 units each.
- 3 boxes of the third type that contain 1 unit each.
You can take all the boxes of the first and second types, and one box of the
third type.
The total number of units will be = (1 * 3) + (2 * 2) + (1 * 1) = 8.
```

### Example 2

```text
Input: boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10
Output: 91
Explanation: There are 14 boxes in total but the truck holds only 10, so four
are left behind — the four with the fewest units. Take all 5 boxes of the
first type (50 units), all 3 boxes of the fourth type (27 units), and 2 boxes
of the third type (14 units):
(5 * 10) + (3 * 9) + (2 * 7) = 50 + 27 + 14 = 91.
```

### Constraints

- `1 <= boxTypes.length <= 1000`
- `1 <= numberOfBoxes_i, numberOfUnitsPerBox_i <= 1000`
- `1 <= truckSize <= 10⁶`

## Hints

### Hint 1

If we have space for at least one box, it is always optimal to put the box
with the most units on the truck.

### Hint 2

Sort the box types so that the number of units per box is non-increasing.

### Hint 3

Iterate over the box types and take from each type as many boxes as you can.
