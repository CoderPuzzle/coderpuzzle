# Count All Possible Routes

## Description

You are given an array of distinct positive integers `locations`, where
`locations[i]` is the position of city `i`. You are also given integers
`start`, `finish`, and `fuel`, the starting city, the destination city,
and the amount of fuel you begin with.

From any city `i` you may move to any other city `j` (`j != i`), which
costs `|locations[i] - locations[j]|` fuel. Fuel may never drop below
zero at any point along the trip, and a city — including `start` and
`finish` — may be visited more than once.

A route is the exact sequence of cities you travel through. Reaching
`finish` does not force the trip to stop: you may keep moving to other
cities (possibly passing through `finish` again) as long as fuel allows,
and every distinct sequence that ends at `finish` is counted separately,
including sequences that pass through `finish` partway and continue on
before finally stopping there.

Return the number of distinct routes from `start` to `finish` that use
no more than the given `fuel`. Since this count can be very large, return
it modulo `10^9 + 7`.

### Example 1

```text
Input: locations = [2,3,6,8,4], start = 1, finish = 3, fuel = 5
Output: 4
Explanation: There are 4 routes, each using at most 5 units of fuel:
1 -> 3
1 -> 2 -> 3
1 -> 4 -> 3
1 -> 4 -> 2 -> 3
```

### Example 2

```text
Input: locations = [4,3,1], start = 1, finish = 0, fuel = 6
Output: 5
Explanation: The 5 routes are:
1 -> 0, using 1 unit of fuel
1 -> 2 -> 0, using 5 units of fuel
1 -> 2 -> 1 -> 0, using 5 units of fuel
1 -> 0 -> 1 -> 0, using 3 units of fuel
1 -> 0 -> 1 -> 0 -> 1 -> 0, using 5 units of fuel
Each route passes through city 0 (finish) either once at the very end,
or earlier and then returns to it later — every such sequence counts as
a separate route.
```

### Example 3

```text
Input: locations = [5,2,1], start = 0, finish = 2, fuel = 3
Output: 0
Explanation: The cheapest way from city 0 to city 2 costs
|5 - 1| = 4 fuel directly, or |5 - 2| + |2 - 1| = 3 + 1 = 4 fuel via city 1.
Either way it needs more fuel than the 3 units available, so no route
is possible.
```

### Constraints

- `2 <= locations.length <= 100`
- `1 <= locations[i] <= 10^9`
- All integers in `locations` are distinct.
- `0 <= start, finish < locations.length`
- `1 <= fuel <= 200`

## Hints

### Hint 1

Model the problem as a search over `(current city, fuel remaining)`, and
memoize on that pair.

### Hint 2

Because every position in `locations` is distinct, every move spends at
least one unit of fuel, so no state can be revisited with the same fuel
left — the memoized search always terminates.
