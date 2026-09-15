# Convert JSON String to Object

## Description

A string `str` containing exactly one JSON value is given. Interpret the
text and return the value it describes — the same value a JSON parser
would produce: objects become key-to-value records, arrays become lists,
and the leaves are strings, numbers, booleans, or null.

Solve it without the built-in `JSON.parse`.

### Example 1

```text
Input: str = '{"a":2,"b":[1,2,3]}'
Output: {"a":2,"b":[1,2,3]}
Explanation: The text is an object of two keys: `a` holds the number 2
and `b` holds the array of the numbers 1, 2, and 3.
```

### Example 2

```text
Input: str = 'true'
Output: true
Explanation: Primitives are valid JSON on their own — the whole text is
one boolean.
```

### Example 3

```text
Input: str = '[1,5,"false",{"a":2}]'
Output: [1,5,"false",{"a":2}]
Explanation: The array's four elements arrive in order: the numbers 1
and 5, the string `false` — text, not the boolean — and an object with
the single key `a`.
```

### Constraints

- `1 <= str.length <= 10⁵`
- `str` is a valid JSON text holding exactly one value: a string, a
  number, an array, an object, a boolean, or null
- `str` contains no whitespace and no escape sequences, so every string
  value runs from its opening quote to the very next quote and holds
  only printable characters

## Hints

### Hint 1

The grammar is recursive: an array or object holds values, and those
values may themselves be arrays or objects. A routine that parses one
value can simply call itself whenever a container opens, and return
once the container closes.

### Hint 2

The guarantee that strings hold no escapes makes each leaf cheap to
read: a string is whatever sits before the next quote, and a number is
the run of characters that can appear inside one, converted in a single
step.
