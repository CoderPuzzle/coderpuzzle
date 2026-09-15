# Peeking Iterator

## Description

Design an iterator that supports the `peek` operation on an existing iterator
in addition to the `hasNext` and `next` operations.

Implement the `PeekingIterator` class:

- `PeekingIterator(Iterator<int> nums)` initializes the object with the given
  integer iterator `iterator`.
- `int next()` returns the next element in the array and moves the pointer to
  the next element.
- `boolean hasNext()` returns `true` if there are still elements in the array.
- `int peek()` returns the next element in the array without moving the
  pointer.

Note: each language may have a different implementation of the constructor and
`Iterator`, but they all support the `int next()` and `boolean hasNext()`
functions.

On LeetCode the constructor wraps a language-provided `Iterator` object; here
sequences cross the wire as value arrays, so the judge hands your constructor
the underlying integer array directly. Implement `next`, `hasNext`, and `peek`
over that array exactly as you would over the wrapped iterator — the
lookahead-cache discipline is unchanged, and `peek` still must return the next
element without advancing.

### Example 1

```text
Input:
["PeekingIterator", "next", "peek", "next", "next", "hasNext"]
[[[1, 2, 3]], [], [], [], [], []]
Output: [null, 1, 2, 2, 3, false]
Explanation:
PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3]
peekingIterator.next();    // return 1, the pointer moves to the next element [1,2,3].
peekingIterator.peek();    // return 2, the pointer does not move [1,2,3].
peekingIterator.next();    // return 2, the pointer moves to the next element [1,2,3]
peekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]
peekingIterator.hasNext(); // return False
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- All the calls to `next` and `peek` are valid.
- At most `1000` calls will be made to `next`, `hasNext`, and `peek`.

### Follow-up

How would you extend your design to be generic and work with all types, not
just integer?

## Hints

### Hint 1

Think of "looking ahead". You want to cache the next element.

### Hint 2

Is one variable sufficient? Why or why not?

### Hint 3

Test your design with call order of `peek()` before `next()` vs `next()`
before `peek()`.

### Hint 4

For a clean implementation, check out Google's guava library source code.
