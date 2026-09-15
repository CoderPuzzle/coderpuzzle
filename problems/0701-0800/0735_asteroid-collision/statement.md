# Asteroid Collision

## Description

We are given an array `asteroids` of integers representing asteroids in a row.
The indices of the asteroids in the array represent their relative position in
space.

For each asteroid, the absolute value represents its size, and the sign
represents its direction (positive meaning right, negative meaning left). Each
asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids
meet, the smaller one will explode. If both are the same size, both will
explode. Two asteroids moving in the same direction will never meet.

### Example 1

```text
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
```

### Example 2

```text
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
```

### Example 3

```text
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
```

### Example 4

```text
Input: asteroids = [3,5,-6,2,-1,4]
Output: [-6,2,4]
Explanation: The asteroid -6 makes the asteroids 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 destroys -1. Since 2 and 4 are both moving right, they never collide.
```

### Constraints

- `2 <= asteroids.length <= 10⁴`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] != 0`

## Hints

### Hint 1

Say a row of asteroids is stable. What happens when a new asteroid is added on the right?

### Hint 2

Only an asteroid moving left can collide, and only with the last surviving asteroid moving right.

### Hint 3

A stack of surviving asteroids lets you resolve collisions one by one as each new asteroid arrives.
