# Number of Ships in a Rectangle

## Description

This is an **interactive** problem.

Each ship sits on an integer point of a cartesian plane representing the sea,
and each integer point holds **at most one** ship. You are given the top
right and bottom left corners of a rectangle; return the **number of ships**
inside it, counting ships on the boundary. It is guaranteed that the
rectangle holds **at most 10** ships.

The ships' positions are hidden — they only initialize the sea internally, so
you must solve the problem "blindfolded", through the `Sea` object the judge
hands to your method:

- `hasShips(topRight, bottomLeft)` — returns `true` if there is at least one
  ship in the rectangle spanned by those two corner points, **including on
  the boundary**, and `false` otherwise. Each point is a two-element array
  `[x, y]`.

Submissions making more than **400 calls to `hasShips`** are judged wrong,
and any solution that attempts to circumvent the judge is disqualified.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
signature is `countShips(sea, topRight, bottomLeft)`, and corner points are
plain two-element arrays `[x, y]` rather than a `Point` class. The query
rectangle may degenerate to a single row, a single column, or a single point.

### Example 1

```text
Input: ships = [[1,1],[2,2],[3,3],[5,5]], topRight = [4,4], bottomLeft = [0,0]
Output: 3
Explanation: From [0,0] to [4,4] there are 3 ships within the range — the one at [5,5] lies outside it.
```

### Example 2

```text
Input: ships = [[1,1],[2,2],[3,3]], topRight = [1000,1000], bottomLeft = [0,0]
Output: 3
Explanation: The rectangle covers the whole sea, so all 3 ships are counted.
```

### Constraints

- On the input, `ships` is only given to initialize the sea internally; your
  method never sees it.
- `0 <= bottomLeft[0] <= topRight[0] <= 1000`
- `0 <= bottomLeft[1] <= topRight[1] <= 1000`
- At most 10 ships lie inside the query rectangle.
- At most 400 calls to `hasShips`.

## Hints

### Hint 1

A single `hasShips` call on a rectangle that answers `false` rules out every
point in it at once. That is the whole leverage you get: spend queries on
regions, not on points.

### Hint 2

Split the rectangle into four quadrants around its midpoint and recurse only
into the quadrants that answer `true`. A region that shrinks to one cell and
still answers `true` holds exactly one ship, so it contributes 1 and stops.

### Hint 3

Because at most 10 ships live in the box, at most 10 regions per level of the
recursion can answer `true`, and the coordinate range 0…1000 bottoms out
after about 10 halvings. Take care that a split never queries an empty
rectangle — reject `bottomLeft > topRight` before spending a call.
