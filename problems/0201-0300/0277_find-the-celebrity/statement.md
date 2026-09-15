# Find the Celebrity

## Description

Suppose you are at a party with `n` people labeled from `0` to `n - 1`,
and among them there may exist one celebrity. The definition of a celebrity
is that all the other `n - 1` people know the celebrity, but the celebrity
does not know any of them.

You are given an `n x n` matrix `graph` where `graph[i][j] == 1` means person
`i` knows person `j`, and `graph[i][j] == 0` means person `i` does not know
person `j`. Every person knows themselves (`graph[i][i] == 1`), which does not
count toward the definition.

Return the celebrity's label if there is a celebrity at the party. If there
is no celebrity, return `-1`.

### Example 1

```text
Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
Output: 1
Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j. The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.
```

![Three people as circles with directed "knows" arrows; person 1 is highlighted as the celebrity everyone knows](figures/example-1.svg)

### Example 2

```text
Input: graph = [[1,0,1],[1,1,0],[0,1,1]]
Output: -1
Explanation: There is no celebrity.
```

![Three people as circles whose "knows" arrows form a cycle, so nobody is a celebrity](figures/example-2.svg)

### Constraints

- `n == graph.length == graph[i].length`
- `2 <= n <= 100`
- `graph[i][j]` is `0` or `1`.
- `graph[i][i] == 1`

### Follow-up

In the classic interview setting the matrix is hidden behind a helper
`knows(a, b)` and you are charged per call: could you find the celebrity
with at most `3 * n` such calls?

## Hints

### Hint 1

Use elimination: if person A knows person B, A cannot be the celebrity; if A does not know B, B cannot be the celebrity — each question rules out exactly one candidate.

### Hint 2

One linear elimination pass over all n people leaves a single possible candidate.

### Hint 3

The candidate is not yet proven: a second pass must verify that everyone knows the candidate and the candidate knows nobody.
