# All O`one Data Structure

## Description

Design a data structure that stores a counter per string and can report the
strings with the minimum and maximum counts.

Implement the `AllOne` class:

- `AllOne()` Initializes the object of the data structure.
- `void inc(String key)` Increments the count of the string `key` by `1`. If
  `key` does not exist in the data structure, insert it with count `1`.
- `void dec(String key)` Decrements the count of the string `key` by `1`. If
  the count of `key` is `0` after the decrement, remove it from the data
  structure. Every call is guaranteed to name a `key` that currently exists.
- `String getMaxKey()` Returns one of the keys with the maximal count. If no
  element exists, returns the empty string `""`.
- `String getMinKey()` Returns one of the keys with the minimal count. If no
  element exists, returns the empty string `""`.

Each function must run in `O(1)` average time complexity.

### Example 1

```text
Input:
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output: [null, null, null, "hello", "hello", null, "hello", "leet"]
Explanation:
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello" — the only key, count 2
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello" — count 2 beats leet's 1
allOne.getMinKey(); // return "leet" — count 1
```

### Example 2

```text
Input:
["AllOne", "inc", "dec", "getMaxKey", "getMinKey"]
[[], ["a"], ["a"], [], []]
Output: [null, null, null, "", ""]
Explanation:
AllOne allOne = new AllOne();
allOne.inc("a");
allOne.dec("a");     // count drops to 0, "a" is removed
allOne.getMaxKey();  // no keys remain — return ""
allOne.getMinKey();  // return ""
```

### Constraints

- `1 <= key.length <= 10`
- `key` consists of lowercase English letters.
- Every call to `dec` names a `key` that exists in the data structure at that
  moment.
- At most `5 * 10⁴` calls will be made to `inc`, `dec`, `getMaxKey`, and
  `getMinKey`.

### Follow-up

Counts change by exactly one at a time, so a key's count never jumps over an
intermediate value. How does that let you keep the set of distinct counts in
a doubly linked list, moving each key between adjacent buckets only?

## Hints

### Hint 1

Group keys by count: one bucket per distinct count, each holding the keys
with that count. If the buckets are threaded on a doubly linked list ordered
by count, the minimum and maximum are simply the first and last buckets —
two pointer reads, no scanning.

### Hint 2

`inc` moves a key from the count-`c` bucket to the count-`c+1` bucket, which
is either the next bucket on the list or one that must be created right
there; `dec` moves it to the previous bucket (count `c-1`) or, when the count
reaches zero, deletes it. A hash map from key to its list node makes each
move a constant-time unlink/relink.

### Hint 3

Delete a bucket the moment it becomes empty. That bookkeeping is what keeps
the first and last buckets meaningful, so `getMaxKey` and `getMinKey` never
have to skip over stale counts. Any key inside the requested bucket answers
the query — the head of its inner list is the natural pick.
