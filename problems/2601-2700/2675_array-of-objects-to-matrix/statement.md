# Array of Objects to Matrix

## Description

Write a function that converts an array of objects `arr` into a matrix `m`.

`arr` is an array of objects or arrays. Each item in the array can be deeply
nested with child arrays and child objects. It can also contain numbers,
strings, booleans, and null values.

The first row `m` should be the column names. If there is no nesting, the
column names are the unique keys within the objects. If there is nesting, the
column names are the respective paths in the object separated by ".".

Each of the remaining rows corresponds to an object in `arr`. Each value in
the matrix corresponds to a value in an object. If a given object doesn't
contain a value for a given column, the cell should contain an empty string
"".

The columns in the matrix should be in lexographically ascending order.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`function toMatrix(arr)` with the behavior above; the generated `class
Solution` keeps its `run(matrixCase)` method, whose body hands your function
to the bundle-provided driver: `matrixCase.drive(toMatrix)`. The driver calls
your function once with the case's array `.arr`; whatever matrix comes back
is recorded by the driver as the judged output shown as Output below. Arrays
count as objects too, keyed by their indices as strings; only scalars
(numbers, strings, booleans, null) terminate a path, so empty objects or
arrays contribute no columns.

### Example 1

```text
Input:
arr = [
  {"b": 1, "a": 2},
  {"b": 3, "a": 4}
]
Output:
[
  ["a", "b"],
  [2, 1],
  [4, 3]
]
Explanation: There are two unique column names in the two objects: "a" and "b".
"a" corresponds with [2, 4].
"b" coresponds with [1, 3].
```

### Example 2

```text
Input:
arr = [
  {"a": 1, "b": 2},
  {"c": 3, "d": 4},
  {}
]
Output:
[
  ["a", "b", "c", "d"],
  [1, 2, "", ""],
  ["", "", 3, 4],
  ["", "", "", ""]
]
Explanation: There are 4 unique column names: "a", "b", "c", "d".
The first object has values associated with "a" and "b".
The second object has values associated with "c" and "d".
The third object has no keys, so it is just a row of empty strings.
```

### Example 3

```text
Input:
arr = [
  {"a": {"b": 1, "c": 2}},
  {"a": {"b": 3, "d": 4}}
]
Output:
[
  ["a.b", "a.c", "a.d"],
  [1, 2, ""],
  [3, "", 4]
]
Explanation: In this example, the objects are nested. The keys represent the full path to each value separated by periods.
There are three paths: "a.b", "a.c", "a.d".
```

### Example 4

```text
Input:
arr = [
  [{"a": null}],
  [{"b": true}],
  [{"c": "x"}]
]
Output:
[
  ["0.a", "0.b", "0.c"],
  [null, "", ""],
  ["", true, ""],
  ["", "", "x"]
]
Explanation: Arrays are also considered objects with their keys being their indices.
Each array has one element so the keys are "0.a", "0.b", and "0.c".
```

### Example 5

```text
Input:
arr = [
  {},
  {},
  {},
]
Output:
[
  [],
  [],
  [],
  []
]
Explanation: There are no keys so every row is an empty array.
```

### Constraints

- `arr` is a valid JSON array
- `1 <= arr.length <= 1000`
- `unique keys <= 1000`

## Hints

### Hint 1

How could you split the problem up into sub-problems?

### Hint 2

1.) Write a function that converts a single object into a dictionary that maps the path name to values. You can solve this recursively by keeping track of current path list.

### Hint 3

2.) Write a function that converts a list of dictionaries into a matrix. Start by creating a list of all possible paths in any of the dictionaries. This will represent the columns.
