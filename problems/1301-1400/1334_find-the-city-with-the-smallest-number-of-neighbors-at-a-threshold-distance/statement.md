# Find the City With the Smallest Number of Neighbors at a Threshold Distance

## Description

There are `n` cities numbered from `0` to `n - 1`. Given the array `edges`
where `edges[i] = [fromi, toi, weighti]` represents a bidirectional and
weighted edge between cities `fromi` and `toi`, and given the integer
`distanceThreshold`, return the city with the smallest number of cities at
a distance at most `distanceThreshold`.

If there are multiple such cities, return the city with the greatest number.

Notice that the distance of a path connecting cities `i` and `j` is equal to
the sum of the edges' weights along that path.

### Example 1

```text
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -> [City 1, City 2]
City 1 -> [City 0, City 2, City 3]
City 2 -> [City 0, City 1, City 3]
City 3 -> [City 1, City 2]
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4,
but we have to return city 3 since it has the greatest number.
```

![The four cities with weighted edges; city 3 is highlighted as the answer, reaching only cities 1 and 2 within distance 4.](figures/example-1.svg)

### Example 2

```text
Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
Output: 0
Explanation: The neighboring cities at a distanceThreshold = 2 for each city are:
City 0 -> [City 1]
City 1 -> [City 0, City 4]
City 2 -> [City 3, City 4]
City 3 -> [City 2, City 4]
City 4 -> [City 1, City 2, City 3]
The city 0 has 1 neighboring city at a distanceThreshold = 2.
```

![The five cities with weighted edges; city 0 is highlighted as the answer, reaching only city 1 within distance 2.](figures/example-2.svg)

### Constraints

- `2 <= n <= 100`
- `1 <= edges.length <= n * (n - 1) / 2`
- `edges[i].length == 3`
- `0 <= fromi < toi < n`
- `1 <= weighti, distanceThreshold <= 10^4`
- All pairs `(fromi, toi)` are distinct.

## Hints

### Hint 1

Use Floyd-Warshall to compute any-point to any-point distances (Dijkstra from every node also works since weights are non-negative).

### Hint 2

For each city, count the cities reachable within the threshold (excluding itself).

### Hint 3

Scan for the city with the smallest count, breaking ties by choosing the greatest city number.
