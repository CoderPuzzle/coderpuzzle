# Create Object from Two Arrays

## Description

Given two arrays keysArr and valuesArr, return a new object obj. Each
key-value pair in obj should come from keysArr[i] and valuesArr[i].

If a duplicate key exists at a previous index, that key-value should be
excluded. In other words, only the first key should be added to the object.

If the key is not a string, it should be converted into a string by calling
String() on it.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript only
— LeetCode offers no other languages for it. Your entry point is a class
`Solution` with `run(caseRunner)`; inside it, call `caseRunner.check(this)`.
The case runner then hands your `createObject(keysArr, valuesArr)` method the
two arrays as live JavaScript values: elements keep their real types, so the
string `"1"` and the number `1` arrive as genuinely different values that
both coerce to the key `"1"`. Judging compares your returned object against
the expected key-value structure inside the harness itself, over own
string-keyed properties: the key set must match exactly and every stored
value must compare deeply equal, while property insertion order is not
observed. Only keys go through String(); values are carried through
untouched, whatever their type.

### Example 1

```text
Input: keysArr = ["a", "b", "c"], valuesArr = [1, 2, 3]
Output: {"a": 1, "b": 2, "c": 3}
Explanation: The keys "a", "b", and "c" are paired with the values 1, 2, and 3 respectively.
```

### Example 2

```text
Input: keysArr = ["1", 1, false], valuesArr = [4, 5, 6]
Output: {"1": 4, "false": 6}
Explanation: First, all the elements in keysArr are converted into strings. We can see there are two occurrences of "1". The value associated with the first occurrence of "1" is used: 4.
```

### Example 3

```text
Input: keysArr = [], valuesArr = []
Output: {}
Explanation: There are no keys so an empty object is returned.
```

### Constraints

- keysArr and valuesArr are valid JSON arrays
- 2 <= JSON.stringify(keysArr).length, JSON.stringify(valuesArr).length <= 5 * 10⁵
- keysArr.length === valuesArr.length
