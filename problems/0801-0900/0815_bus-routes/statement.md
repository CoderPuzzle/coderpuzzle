# Bus Routes

## Description

You are given an array `routes` representing bus routes where `routes[i]` is
the bus route that the `i`th bus repeats forever.

For example, if `routes[0] = [1, 5, 7]`, this means the 0th bus travels in the
sequence `1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ...` forever.

You will start at the bus stop `source` (you are not on any bus initially),
and you want to go to the bus stop `target`. You can travel between bus stops
by buses only.

Return the least number of buses you must take to travel from `source` to
`target`. Return `-1` if it is not possible.

### Example 1

```text
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
Explanation: The best strategy is to take the first bus to the bus stop 7,
then take the second bus to the bus stop 6.
```

### Example 2

```text
Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1
```

### Constraints

- `1 <= routes.length <= 500`
- `1 <= routes[i].length <= 10^5`
- All the values of `routes[i]` are unique.
- `sum(routes[i].length) <= 10^5`
- `0 <= routes[i][j] < 10^6`
- `0 <= source, target < 10^6`

## Hints

### Hint 1

Treat each bus route as a graph node, not each stop: two routes are adjacent when they share at least one stop.

### Hint 2

Map every stop to the list of routes passing through it, then BFS over routes starting from the routes containing source.

### Hint 3

Each BFS level costs one bus ride; if source equals target the answer is 0.
