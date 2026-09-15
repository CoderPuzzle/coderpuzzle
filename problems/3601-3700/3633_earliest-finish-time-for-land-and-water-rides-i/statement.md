# Earliest Finish Time for Land and Water Rides I

## Description

A theme park splits its attractions into two categories: land rides and water
rides. Land ride `i` opens at time `landStartTime[i]` and lasts
`landDuration[i]` minutes; water ride `j` opens at time `waterStartTime[j]`
and lasts `waterDuration[j]` minutes.

A visitor must ride exactly one land ride and exactly one water ride, in
either order. The rules are:

- A ride can be boarded at its opening time or at any later moment.
- A ride boarded at time `t` finishes at time `t + duration`.
- The moment one ride finishes, the visitor may board the other ride if it is
  already open, or wait until its opening time otherwise.

Return the earliest possible moment at which both rides have been finished.

### Example 1

```text
Input: landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]
Output: 9
Explanation: Riding land ride 0 first works best. It opens at time 2 and,
with duration 4, finishes at time 6. Water ride 0 opens at time 6 as well,
so the visitor boards it immediately and finishes at 6 + 3 = 9. Every other
plan ends later: either land-first alternative defers the water ride to a
start at time 9 (finishing at 12), and riding the water ride first pushes
the land rides to finishes at 10 and 13.
```

### Example 2

```text
Input: landStartTime = [5], landDuration = [3], waterStartTime = [1], waterDuration = [10]
Output: 14
Explanation: Riding the water ride first wins here. It opens at time 1 and
finishes at time 11, which is already past the land ride's opening time of
5, so the visitor boards it immediately and finishes at 11 + 3 = 14. Riding
the land ride first would end it at time 8 and push the water ride's finish
to 8 + 10 = 18.
```

### Constraints

- `1 <= landStartTime.length == landDuration.length <= 100`
- `1 <= waterStartTime.length == waterDuration.length <= 100`
- `1 <= landStartTime[i], landDuration[i], waterStartTime[j], waterDuration[j] <= 1000`

## Hints

### Hint 1

Use brute force.
