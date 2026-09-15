# Maximum Profit of Operating a Centennial Wheel

## Description

You operate a Centennial Wheel with four gondolas, each able to hold up
to four riders. Rotating the wheel one notch counterclockwise costs
`runningCost` dollars. Every rider pays `boardingCost` dollars at the
moment they board the gondola nearest the ground, and they get off again
once that same gondola comes back around to the ground.

You are given an integer array `customers`, where `customers[i]` is the
number of new riders who arrive just before the wheel's `i`-th rotation
(rotations are counted starting from `0`). At each rotation, as many
waiting riders as fit board first, up to four of them; any riders who
don't fit stay behind to wait for a later rotation. A rider never has to
wait if a gondola has open seats for them right away.

Once every entry of `customers` has arrived, riders may still be waiting.
You must keep rotating the wheel — each further rotation still costs
`runningCost` and still boards up to four waiting riders — until nobody
is left waiting; you cannot abandon riders at the wheel.

After each rotation, compute the running profit so far: total boarding
revenue collected minus total rotation cost paid. Return the number of
rotations performed at the point where this running profit reaches its
highest value. If several different rotation counts tie for the highest
profit, return the smallest of them — you're free to stop operating the
wheel the instant you reach that peak, and all further rotations needed
only to clear out anyone still waiting are free of charge. If the profit
is never positive at any point, return `-1`.

### Example 1

![diagram](figures/1599-1.svg)

```text
Input: customers = [8,3], boardingCost = 5, runningCost = 6
Output: 3
Explanation: 8 customers arrive before rotation 1: 4 board (profit 4*5 -
1*6 = 14) and 4 wait. 3 customers arrive before rotation 2: the 4 waiting
board and 3 new customers wait (profit 8*5 - 2*6 = 28). Rotation 3 boards
the final 3 waiting customers (profit 11*5 - 3*6 = 37). Profit never goes
higher after that, so the answer is 3.
```

### Example 2

```text
Input: customers = [10,9,6], boardingCost = 6, runningCost = 4
Output: 7
Explanation: All three customers entries are consumed by rotation 3, but
riders keep waiting: rotation 1 boards 4 of the 10 arrivals (6 wait),
rotation 2 boards 4 more while 9 new arrive (11 wait), rotation 3 boards
4 more while 6 new arrive (13 wait). Rotations 4 through 6 each board 4
more of the backlog, and rotation 7 boards the last rider. Profit keeps
climbing the whole time, peaking at 25*6 - 7*4 = 122 after rotation 7.
```

### Example 3

```text
Input: customers = [3,4,0,5,1], boardingCost = 1, runningCost = 92
Output: -1
Explanation: Every rotation boards someone (3, 4, 0, then 4 of the 5
waiting, then the last 2), but boardingCost is far too small to cover
runningCost. Profit is negative after every one of the 5 rotations, so
the answer is -1.
```

### Constraints

- `n == customers.length`
- `1 <= n <= 10^5`
- `0 <= customers[i] <= 50`
- `1 <= boardingCost, runningCost <= 100`

## Hints

### Hint 1

Simulate the wheel rotation by rotation, tracking how many riders are
waiting and the running profit.

### Hint 2

The wheel never has to rotate more than `50 / 4 * n` times in total,
however long the queue takes to clear.
