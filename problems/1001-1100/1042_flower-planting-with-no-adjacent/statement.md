# Flower Planting With No Adjacent

## Description

You have n gardens, labeled from 1 to n, and an array paths where
`paths[i] = [xi, yi]` describes a bidirectional path between garden `xi`
to garden `yi`. In each garden, you want to plant one of 4 types of
flowers.

All gardens have at most 3 paths coming into or leaving it.

Your task is to choose a flower type for each garden such that, for any
two gardens connected by a path, they have different types of flowers.

Return any such a choice as an array `answer`, where `answer[i]` is the
type of flower planted in the `(i + 1)th` garden. The flower types are
denoted 1, 2, 3, or 4. It is guaranteed an answer exists.

Many valid colorings exist for most inputs, but this judge compares the
returned array exactly, so the assignment must come from one
deterministic procedure. Process the gardens in order from garden 1 to
garden n. For garden `i`, look only at the neighbors of `i` (gardens
joined to it by a path) that have already been assigned a flower type
earlier in this process, collect the set of flower types already used
among them, and give garden `i` the smallest-numbered flower type from
`{1, 2, 3, 4}` that is not in that set. Because every garden has at most
3 paths, at most 3 flower types can ever be excluded this way, so a valid
choice always exists.

### Example 1

```text
Input: n = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]
Explanation:
Gardens 1 and 2 have different types.
Gardens 2 and 3 have different types.
Gardens 3 and 1 have different types.
Hence, [1,2,3] is a valid answer. Other valid answers include [1,2,4],
[1,4,2], and [3,2,1].
```

### Example 2

```text
Input: n = 4, paths = [[1,2],[3,4]]
Output: [1,2,1,2]
```

### Example 3

```text
Input: n = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
Output: [1,2,3,4]
```

### Constraints

- `1 <= n <= 10^4`
- `0 <= paths.length <= 2 * 10^4`
- `paths[i].length == 2`
- `1 <= xi, yi <= n`
- `xi != yi`
- Every garden has at most 3 paths coming into or leaving it.

## Hints

### Hint 1

Since each garden is connected to at most 3 gardens, there's always an
available color for each garden. For example, if one garden is next to
gardens with colors 1, 3, 4, then color #2 is available.
