# First Failing Build

## Description

You are shipping a product as a sequence of `n` numbered builds,
`1` through `n`. Builds are cumulative — once one build fails quality
review, every build released after it fails too.

You have a query `isFailingBuild(build)` that reports whether a given
build number fails review. Find the earliest failing build while
minimizing how many times you call it.

**Note (CoderPuzzle):** the signature is `locateFirstFailure(buildInspector, n)`;
the query arrives bundled in the `buildInspector` object handed to your
method — call `buildInspector.isFailingBuild(build)` to use it.

### Example 1

```text
Input: n = 5, bad = 4
Output: 4
Explanation: call isFailingBuild(3) -> false
call isFailingBuild(5) -> true
call isFailingBuild(4) -> true
Then 4 is the first failing build.
```

### Example 2

```text
Input: n = 1, bad = 1
Output: 1
```

### Constraints

- `1 <= bad <= n <= 2³¹ - 1`
