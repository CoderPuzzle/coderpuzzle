# Number of Ways to Build House of Cards

## Description

You are given an integer `n` representing the number of playing cards you
have. A house of cards meets the following conditions:

- A house of cards consists of one or more rows of triangles and
  horizontal cards.
- Triangles are created by leaning two cards against each other.
- One card must be placed horizontally between all adjacent triangles in
  a row.
- Any triangle on a row higher than the first must be placed on a
  horizontal card from the previous row.
- Each triangle is placed in the leftmost available spot in the row.

Return the number of distinct houses of cards you can build using all `n`
cards. Two houses of cards are considered distinct if there exists a row
where the two houses contain a different number of cards.

A row with `k` triangles uses `3 * k - 1` cards (`2k` leaning cards plus
`k - 1` horizontal ones), and each row above must have strictly fewer
triangles than the row below it, since every upper triangle rests on one
of the previous row's horizontal cards.

### Example 1

![diagram](figures/2189-1.svg)

```text
Input: n = 16
Output: 2
Explanation: Two shapes use all 16 cards: a single-triangle row (2
cards) over a five-triangle row (14 cards), and a two-triangle row (5
cards) over a four-triangle row (11 cards).
```

### Example 2

![diagram](figures/2189-2.svg)

```text
Input: n = 2
Output: 1
Explanation: The only valid house is a single row holding one triangle.
```

### Example 3

![diagram](figures/2189-3.svg)

```text
Input: n = 4
Output: 0
Explanation: No combination of rows uses exactly 4 cards.
```

### Constraints

- `1 <= n <= 500`
