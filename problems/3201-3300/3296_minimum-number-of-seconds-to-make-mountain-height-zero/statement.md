# Minimum Number of Seconds to Make Mountain Height Zero

## Description

You are given an integer `mountainHeight` denoting the height of a mountain.

You are also given an integer array `workerTimes` representing the work time of workers in seconds.

Each worker may reduce the mountain's height by any non-negative integer amount. If worker `i` reduces the height by `x`, then:

- reducing the first unit of height takes `workerTimes[i]` seconds,
- reducing the second unit takes `workerTimes[i] * 2` seconds,
- ...
- reducing the `x`-th unit takes `workerTimes[i] * x` seconds.

The total time spent by worker `i` is the sum of the times required for all `x` units they reduce. As all workers operate simultaneously, the total time required is the maximum time spent by any worker.

Return an integer representing the minimum number of seconds required for the workers to make the height of the mountain 0.

### Example 1

```text
Input: mountainHeight = 4, workerTimes = [2,1,1]
Output: 3
Explanation: One way the height of the mountain can be reduced to 0 is:
Worker 0 reduces the height by 1, taking workerTimes[0] = 2 seconds.
Worker 1 reduces the height by 2, taking workerTimes[1] + workerTimes[1] * 2 = 3 seconds.
Worker 2 reduces the height by 1, taking workerTimes[2] = 1 second.
Since they work simultaneously, the minimum time needed is max(2, 3, 1) = 3 seconds.
```

### Example 2

```text
Input: mountainHeight = 10, workerTimes = [3,2,2,4]
Output: 12
Explanation: Worker 0 reduces the height by 2, taking workerTimes[0] + workerTimes[0] * 2 = 9 seconds.
Worker 1 reduces the height by 3, taking workerTimes[1] + workerTimes[1] * 2 + workerTimes[1] * 3 = 12 seconds.
Worker 2 reduces the height by 3, taking workerTimes[2] + workerTimes[2] * 2 + workerTimes[2] * 3 = 12 seconds.
Worker 3 reduces the height by 2, taking workerTimes[3] + workerTimes[3] * 2 = 12 seconds.
The number of seconds needed is max(9, 12, 12, 12) = 12 seconds.
```

### Example 3

```text
Input: mountainHeight = 5, workerTimes = [1]
Output: 15
Explanation: There is only one worker in this example, so the answer is workerTimes[0] + workerTimes[0] * 2 + workerTimes[0] * 3 + workerTimes[0] * 4 + workerTimes[0] * 5 = 15.
```

### Constraints

- `1 <= mountainHeight <= 10⁵`
- `1 <= workerTimes.length <= 10⁴`
- `1 <= workerTimes[i] <= 10⁶`

## Hints

### Hint 1

Can we use binary search to solve this problem?

### Hint 2

Do a binary search on the number of seconds to check if it's enough to reduce the mountain height to 0 or less with all workers working simultaneously.
