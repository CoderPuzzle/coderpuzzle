# Earliest Finish Time for Land and Water Rides II

## Description

A theme park offers two categories of attractions: land rides and water
rides. There are `n` land rides and `m` water rides. Land ride `i` can first
be boarded at moment `landStartTime[i]` and then takes `landDuration[i]`
time; water ride `j` can first be boarded at moment `waterStartTime[j]` and
then takes `waterDuration[j]` time.

A visitor must ride exactly one land ride and exactly one water ride, in
either order:

- A ride may be boarded at its opening moment or at any later moment.
- A ride boarded at moment `t` finishes at moment `t + duration`.
- The moment one ride finishes, the visitor may board the other ride if it is
  already open, or wait until it opens.

Return the earliest possible moment at which both rides have been finished.

### Example 1

```text
Input: landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]
Output: 9
Explanation: Board land ride 0 the moment it opens at time 2; it finishes at
2 + 4 = 6, and water ride 0 opens exactly then, so boarding it immediately
finishes at 6 + 3 = 9. No plan beats this: riding the water ride first ends
it at 9 and the best land ride afterwards still runs to 9 + 1 = 10, while
starting with land ride 1 delays the water ride to 9 + 3 = 12.
```

### Example 2

```text
Input: landStartTime = [5], landDuration = [3], waterStartTime = [1], waterDuration = [10]
Output: 14
Explanation: Riding the water ride first runs it from time 1 to 11, and the
land ride has long been open, so boarding at 11 finishes at 11 + 3 = 14.
Going land first instead finishes at 8 and then sits out the whole water
ride, ending at 8 + 10 = 18.
```

### Constraints

- `1 <= n, m <= 5 * 10⁴`
- `landStartTime.length == landDuration.length == n`
- `waterStartTime.length == waterDuration.length == m`
- `1 <= landStartTime[i], landDuration[i], waterStartTime[j], waterDuration[j] <= 10⁵`

## Hints

### Hint 1

Sort each ride list by opening time and build a prefix minimum of ride durations and a suffix minimum of ride finish times (start + duration).

### Hint 2

Try both orders, land then water and water then land. For each ride in the first list compute `finish1 = start1 + duration1`.

### Hint 3

Binary-search the second list (sorted by start) to split rides into those with `start <= finish1` and those with `start > finish1`. Use the prefix minimum duration on the early group to get an earliest finish of `finish1 + minDuration`, and the suffix minimum finish time on the late group.

### Hint 4

For each pairing take the smaller finish time and track the overall minimum.
