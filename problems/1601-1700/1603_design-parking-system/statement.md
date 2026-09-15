# Design Parking System

## Description

Design a parking system for a parking lot. The lot has three kinds of
parking spaces — big, medium, and small — each with a fixed number of
slots.

Implement the `ParkingSystem` class:

- `ParkingSystem(int big, int medium, int small)` initializes the object
  with the number of free slots for each size.
- `bool addCar(int carType)` checks whether a slot of size `carType` is
  free. `carType` is `1` for big, `2` for medium, or `3` for small. A car
  can only use a slot matching its own type. If a matching slot is free,
  park the car there — occupying that slot — and return `true`;
  otherwise leave the counts unchanged and return `false`.

### Example 1

```text
Input:
["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
[[1, 1, 0], [1], [2], [3], [1]]
Output: [null, true, true, false, false]
Explanation:
ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
parkingSystem.addCar(1); // returns true, 1 slot for a big car is free
parkingSystem.addCar(2); // returns true, 1 slot for a medium car is free
parkingSystem.addCar(3); // returns false, no slot for a small car exists
parkingSystem.addCar(1); // returns false, the one big slot is occupied
```

### Constraints

- `0 <= big, medium, small <= 1000`
- `carType` is `1`, `2`, or `3`.
- At most `1000` calls in total are made to `addCar`.

## Hints

### Hint 1

Record the number of parking slots still available for each car type.
