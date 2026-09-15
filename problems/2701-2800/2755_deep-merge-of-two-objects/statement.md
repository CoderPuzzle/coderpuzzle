# Deep Merge of Two Objects

## Description

Two JSON values obj1 and obj2 are given. Return their deep merge, built
by these rules:

- If both values are objects, the result is an object holding every key
  that appears in either one. A key present in both is filled with the
  deep merge of its two values; a key present in only one is filled with
  that side's value.
- If both values are arrays, the result is an array as long as the
  longer of the two, merged the same way with the indices playing the
  role of keys: an index present in both holds the deep merge of the two
  entries, and an index present in only one holds that side's entry.
- In every other case the result is obj2. This is what an object meeting
  an array produces, and it makes null and the primitive values —
  strings, numbers, booleans — leaves of the merge.

Both inputs are valid JSON values, and you may assume obj1 and obj2 are
the output of a JSON.parse call.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — the original provides no other languages for it.

### Example 1

```text
Input: obj1 = {"a": 1, "c": 3}, obj2 = {"a": 2, "b": 2}
Output: {"a": 2, "c": 3, "b": 2}
Explanation: Key "a" is shared, so obj2's value wins the leaf
comparison. Key "c" exists only in obj1 and key "b" only in obj2, so
each keeps its value.
```

### Example 2

```text
Input: obj1 = [{}, 2, 3], obj2 = [[], 5]
Output: [[], 5, 3]
Explanation: Index 0 holds an object on one side and an array on the
other, so the pairing falls to the take-obj2 rule. Index 1 is shared
and takes obj2's value, and index 2 exists only in obj1 and keeps its
entry.
```

### Example 3

```text
Input:
obj1 = {"a": 1, "b": {"c": [1, [2, 7], 5], "d": 2}},
obj2 = {"a": 1, "b": {"c": [6, [6], [9]], "e": 3}}
Output: {"a": 1, "b": {"c": [6, [6, 7], [9]], "d": 2, "e": 3}}
Explanation: The "c" arrays merge index by index: obj2's plain values
overwrite obj1's, index 1 deep-merges the two nested arrays into
[6, 7], and index 2 exists only in obj2. Key "e" is added because obj1
lacks it.
```

### Example 4

```text
Input: obj1 = true, obj2 = null
Output: null
Explanation: Neither value is an object or an array, so the result is
obj2.
```

### Constraints

- obj1 and obj2 are valid JSON values
- 1 <= JSON.stringify(obj1).length <= 5 * 10⁵
- 1 <= JSON.stringify(obj2).length <= 5 * 10⁵

### Follow-up

Could you produce the merged value without allocating a fresh object or
array for the parts obj2 never touches?

## Hints

### Hint 1

Only two values of the same container kind merge further — two objects,
or two arrays. Beware that `typeof null` is `"object"` in JavaScript:
null is a leaf, overridden like any other non-container.

### Hint 2

A key or index held by only one side contributes that side's value
unchanged, so the only place real work happens is a shared key or index
whose two values are both containers — recurse there.
