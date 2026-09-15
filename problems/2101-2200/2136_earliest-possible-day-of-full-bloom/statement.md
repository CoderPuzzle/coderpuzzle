# Earliest Possible Day of Full Bloom

## Description

You have `n` flower seeds. Every seed must be planted first before it can
begin to grow, then bloom. Planting a seed takes time and so does the growth
of a seed. You are given two 0-indexed integer arrays `plantTime` and
`growTime`, of length `n` each:

- `plantTime[i]` is the number of full days it takes you to plant the `i`th
  seed. Every day, you can work on planting exactly one seed. You do not have
  to work on planting the same seed on consecutive days, but the planting of
  a seed is not complete until you have worked `plantTime[i]` days on
  planting it in total.
- `growTime[i]` is the number of full days it takes the `i`th seed to grow
  after being completely planted. After the last day of its growth, the
  flower blooms and stays bloomed forever.

From the beginning of day `0`, you can plant the seeds in any order.

Return the earliest possible day where all seeds are blooming.

### Example 1

```text
Input: plantTime = [1,4,3], growTime = [2,3,1]
Output: 9
Explanation: One optimal way is:
On day 0, plant the 0th seed. The seed grows for 2 full days and blooms on day 3.
On days 1, 2, 3, and 4, plant the 1st seed. The seed grows for 3 full days and blooms on day 8.
On days 5, 6, and 7, plant the 2nd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
```

![Three seed tracks: planting, growing, and blooming across days 0 through 9](figures/example-1.svg)

### Example 2

```text
Input: plantTime = [1,2,3,2], growTime = [2,1,2,1]
Output: 9
Explanation: One optimal way is:
On day 1, plant the 0th seed. The seed grows for 2 full days and blooms on day 4.
On days 0 and 3, plant the 1st seed. The seed grows for 1 full day and blooms on day 5.
On days 2, 4, and 5, plant the 2nd seed. The seed grows for 2 full days and blooms on day 8.
On days 6 and 7, plant the 3rd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
```

![Four seed tracks with interleaved planting days across days 0 through 9](figures/example-2.svg)

### Example 3

```text
Input: plantTime = [1], growTime = [1]
Output: 2
Explanation: On day 0, plant the 0th seed. The seed grows for 1 full day and blooms on day 2.
Thus, on day 2, all the seeds are blooming.
```

### Constraints

- `n == plantTime.length == growTime.length`
- `1 <= n <= 10^5`
- `1 <= plantTime[i], growTime[i] <= 10^4`

## Hints

### Hint 1

There is no advantage to splitting the planting of a seed across other work; finishing one seed's planting before starting the next keeps every bloom time as early as possible.

### Hint 2

Sort the seeds by growTime in descending order. Note the bloom time of a seed is the sum of plantTime of all seeds planted before it plus its own growTime.

### Hint 3

The seed that blooms last dominates the answer, so answer = max over seeds of (accumulated plant time + grow time) under this ordering.
