# Number of Unique Categories

## Description

This is an **interactive** problem.

You are given an integer `n` and an object `categoryHandler` of class
`CategoryHandler`.

There are `n` elements, numbered from `0` to `n - 1`. Each element has a
category, and your task is to find the number of unique categories.

The class `CategoryHandler` contains the following function, which may
help you:

- `boolean haveSameCategory(integer a, integer b)` — Returns true if
  `a` and `b` are in the same category and false otherwise. Also, if
  either `a` or `b` is not a valid number (i.e. it's greater than or
  equal to nor less than 0), it returns false.

Return the number of unique categories.

**Note (CoderPuzzle):** the signature is `numberOfCategories(categoryHandler,
n)`; the handler arrives as the first argument handed to your method,
and every `haveSameCategory` call counts against an ample budget of
10 000 queries.

### Example 1

```text
Input: n = 6, categoryHandler = [1,1,2,2,3,3]
Output: 3
Explanation: There are 6 elements in this example. The first two
elements belong to category 1, the second two belong to category 2, and
the last two elements belong to category 3. So there are 3 unique
categories.
```

### Example 2

```text
Input: n = 5, categoryHandler = [1,2,3,4,5]
Output: 5
Explanation: There are 5 elements in this example. Each element belongs
to a unique category. So there are 5 unique categories.
```

### Example 3

```text
Input: n = 3, categoryHandler = [1,1,1]
Output: 1
Explanation: There are 3 elements in this example. All of them belong
to one category. So there is only 1 unique category.
```

### Constraints

- `1 <= n <= 100`

## Hints

### Hint 1

It can be proven that all pairs should be asked from the helper
function.

### Hint 2

Iterate from the first element. For each element `i`, ask the helper
function `i` with all `j < i`.

### Hint 3

If there is some `j < i` that `i` and `j` belong to the same group, go
to next `i`. Otherwise, add one to the current number of groups.
