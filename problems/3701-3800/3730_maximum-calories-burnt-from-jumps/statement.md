# Maximum Calories Burnt from Jumps

## Description

You are given an integer array `heights` of length `n`, where `heights[i]`
is the height of the `i`th block of an exercise routine.

You start on the ground at height `0` and must jump onto every block
exactly once, choosing the visiting order yourself. A jump from a block of
height `a` onto a block of height `b` burns `(a - b)²` calories. The first
jump starts on the ground, so landing on a first block of height
`heights[i]` burns `heights[i]²` calories. Once you have jumped onto the
first block, you cannot return to the ground.

Return the maximum total calories you can burn by selecting an optimal
jumping sequence.

### Example 1

```text
Input: heights = [1,7,9]
Output: 181
Explanation: The optimal sequence is [9, 1, 7]. The first jump onto 9
burns 9² = 81 calories, the jump from 9 onto 1 burns (9 - 1)² = 64, and
the jump from 1 onto 7 burns (1 - 7)² = 36, for a total of
81 + 64 + 36 = 181.
```

### Example 2

```text
Input: heights = [5,2,4]
Output: 38
Explanation: The optimal sequence is [5, 2, 4]. The first jump onto 5
burns 5² = 25 calories, the jump from 5 onto 2 burns (5 - 2)² = 9, and
the jump from 2 onto 4 burns (2 - 4)² = 4, for a total of 25 + 9 + 4 = 38.
```

### Example 3

```text
Input: heights = [3,3]
Output: 9
Explanation: The optimal sequence is [3, 3]. The first jump onto 3 burns
3² = 9 calories and the second jump lands on an equally tall block,
burning nothing more.
```

### Constraints

- `1 <= n == heights.length <= 10⁵`
- `1 <= heights[i] <= 10⁵`

## Hints

### Hint 1

Sort heights and greedily distribute the values.

### Hint 2

Place larger values from the back of the sorted heights in non-increasing
order at the even indices.

### Hint 3

Place smaller values from the front of the sorted heights in non-decreasing
order at the odd indices.
