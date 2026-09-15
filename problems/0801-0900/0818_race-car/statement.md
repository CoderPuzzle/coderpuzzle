# Race Car

## Description

Your car starts at position `0` and speed `+1` on an infinite number line. Your
car can go into negative positions. Your car drives automatically according to a
sequence of instructions `'A'` (accelerate) and `'R'` (reverse):

- When you get an instruction `'A'`, your car does the following: `position += speed`, then `speed *= 2`.
- When you get an instruction `'R'`, your car does the following: if your speed is positive then `speed = -1`, otherwise `speed = 1`. Your position stays the same.

For example, after commands `"AAR"`, your car goes to positions
`0 --> 1 --> 3 --> 3`, and your speed goes to `1 --> 2 --> 4 --> -1`.

Given a target position `target`, return the length of the shortest sequence of
instructions to get there.

### Example 1

```text
Input: target = 3
Output: 2
Explanation: The shortest instruction sequence is "AA".
Your position goes from 0 --> 1 --> 3.
```

### Example 2

```text
Input: target = 6
Output: 5
Explanation: The shortest instruction sequence is "AAARA".
Your position goes from 0 --> 1 --> 3 --> 7 --> 7 --> 6.
```

### Constraints

- `1 <= target <= 10⁴`

## Hints

### Hint 1

Model the car as a state `(position, speed)`; each instruction is an edge of cost 1, so the answer is a shortest-path problem.

### Hint 2

Run a breadth-first search over reachable states, and remember to bound the positions (roughly twice the target) since the car may overshoot.

### Hint 3

Accelerating doubles the speed, while reversing keeps the position and sets the speed to `±1`.
