# Is Object Empty

## Description

Given an object or an array, return if it is empty.

An empty object contains no key-value pairs.

An empty array contains no elements.

You may assume the object or array is the output of JSON.parse.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Each case stores `obj`
as raw JSON text; the bundle-provided case carrier runs that text through
JSON.parse exactly as quoted above, so your code receives a genuine
JavaScript object or array. Declare `function isEmpty(obj)` plus a class
`Solution` whose `isEmpty` method returns
`isEmpty(isEmptyCase.obj)`. That returned boolean is the judged answer,
compared exactly.

### Example 1

```text
Input: obj = {"x": 5, "y": 42}
Output: false
Explanation: The object has 2 key-value pairs so it is not empty.
```

### Example 2

```text
Input: obj = {}
Output: true
Explanation: The object doesn't have any key-value pairs so it is empty.
```

### Example 3

```text
Input: obj = [null, false, 0]
Output: false
Explanation: The array has 3 elements so it is not empty.
```

### Constraints

- obj is a valid JSON object or array
- 2 <= JSON.stringify(obj).length <= 10⁵

### Follow up

Can you solve it in O(1) time?
