# Filter Elements from Array

## Description

Given an integer array arr and a filtering function fn, return a filtered
array filteredArr.

The fn function takes one or two arguments:

    arr[i] - number from the arr
    i - index of arr[i]

filteredArr should only contain the elements from the arr for which the
expression fn(arr[i], i) evaluates to a truthy value. A truthy value is a
value where Boolean(value) returns true.

Please solve it without the built-in Array.filter method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(filterCase)`, where `filterCase`
is a bundle-provided `FilterCase` carrying `.arr`, the integer array under
test, and `.fn`, the callable built from the case's function source. Walk
the array with your own loop, call `fn(arr[i], i)` for every index i, and
return a new array holding only the elements whose call result is truthy
(`Boolean(result)` would be true), in their original order. Always pass
both arguments positionally — fns in the corpus may read either argument,
the index, or both. The judged answer is exactly that returned array.

### Example 1

```text
Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
Output: [20,30]
Explanation:
const newArray = filter(arr, fn); // [20, 30]
The function filters out values that are not greater than 10
```

### Example 2

```text
Input: arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
Output: [1]
Explanation:
fn can also accept the index of each element
In this case, the function removes elements not at index 0
```

### Example 3

```text
Input: arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }
Output: [-2,0,1,2]
Explanation:
Falsey values such as 0 should be filtered out
```

### Constraints

- 0 <= arr.length <= 1000
- -10⁹ <= arr[i] <= 10⁹

## Hints

### Hint 1

Start by declaring a new array which will eventually be returned.

### Hint 2

In Javascript, there is the concept of "truthiness" and "falsiness". Values
such as 0, undefined, null, and false are falsy. Most values are truthy:
1, {}, [], true, etc. In Javascript, the contents of if-statements don't
need to be booleans. You can say "if ([1,2,3]) {}", and it's equivalent to
saying 'if (true) {}".

### Hint 3

Loop over each element in the array. If fn(arr[i]) is truthy, push it to
the array.
