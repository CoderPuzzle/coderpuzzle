# Convert Object to JSON String

## Description

Given a value, return a valid JSON string of that value. The value can be a
string, number, array, object, boolean, or null. The returned string should
not include extra spaces. The order of keys should be the same as the order
returned by Object.keys().

Please solve it without using the built-in JSON.stringify method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript only —
LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `stringifyValue(jsonCase)`, where `jsonCase`
is a bundle-provided `JsonCase` carrying `.object`, the live decoded value to
serialize, with property order exactly as listed in the case data. Return the
JSON text as a string; every judged value stays well inside JavaScript's
exact-number range, and all case strings contain only alphanumeric
characters.

### Example 1

```text
Input: object = {"y":1,"x":2}
Output: {"y":1,"x":2}
Explanation:
Return the JSON representation.
Note that the order of keys should be the same as the order returned by
Object.keys().
```

### Example 2

```text
Input: object = {"a":"str","b":-12,"c":true,"d":null}
Output: {"a":"str","b":-12,"c":true,"d":null}
Explanation:
The primitives of JSON are strings, numbers, booleans, and null.
```

### Example 3

```text
Input: object = {"key":{"a":1,"b":[{},null,"Hello"]}}
Output: {"key":{"a":1,"b":[{},null,"Hello"]}}
Explanation:
Objects and arrays can include other objects and arrays.
```

### Example 4

```text
Input: object = true
Output: true
Explanation:
Primitive types are valid inputs.
```

### Constraints

- `value is a valid JSON value`
- `1 <= JSON.stringify(object).length <= 10⁵`
- `maxNestingLevel <= 1000`
- `all strings contain only alphanumeric characters`

## Hints

### Hint 1

Consider the 4 possibilities. The object could be an array, an object, a
string, or another type.

### Hint 2

Think about the problem recursively. If you know how to convert any
sub-data into a string, how could you use it to convert the entire data into
a string?

### Hint 3

If the data is a string, it's just the value surrounded by double quotes. If
the data is another type, its just String(data). If the data is an array,
it's the recursively stringified value of each item separated by commas. If
the data is an object, it's a series of key-value pairs where each value is
the recursively stringified value.
