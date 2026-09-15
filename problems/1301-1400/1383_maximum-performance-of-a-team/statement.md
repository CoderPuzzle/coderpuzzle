# Maximum Performance of a Team

## Description

There are `n` engineers numbered from `1` to `n`. You are given two integer
arrays `speed` and `efficiency`, both of length `n`, where `speed[i]` and
`efficiency[i]` represent the speed and efficiency of the `i^th` engineer
respectively. You are also given an integer `k`.

Choose **at most** `k` different engineers out of the `n` engineers to form
a team with the maximum performance.

The performance of a team is the sum of its engineers' speeds multiplied by
the minimum efficiency among its engineers.

Return the maximum performance of this team. Since the answer can be a huge
number, return it **modulo** `10^9 + 7`.

### Example 1

```text
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2
Output: 60
Explanation: We have the maximum performance of the team by selecting engineer 2 (with speed=10 and efficiency=4) and engineer 5 (with speed=5 and efficiency=7). That is, performance = (10 + 5) * min(4, 7) = 60.
```

### Example 2

```text
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 3
Output: 68
Explanation: This is the same example as the first but k = 3. We can select engineer 1, engineer 2 and engineer 5 to get the maximum performance of the team. That is, performance = (2 + 10 + 5) * min(5, 4, 7) = 68.
```

### Example 3

```text
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 4
Output: 72
```

### Constraints

- `1 <= k <= n <= 10^5`
- `speed.length == n`
- `efficiency.length == n`
- `1 <= speed[i] <= 10^5`
- `1 <= efficiency[i] <= 10^8`

## Hints

### Hint 1

Process the engineers by efficiency in decreasing order, so each engineer in turn fixes the minimum efficiency of a candidate team.

### Hint 2

For each fixed minimum efficiency, keep the at most k-1 fastest engineers with higher efficiency using a min-heap of speeds, and track the best sum-of-speeds times efficiency.

### Hint 3

The raw answer can overflow 32-bit and even 64-bit intermediates in some languages; compute with wide integers and reduce modulo 10^9 + 7 at the end.
