# Time Based Key-Value Store

## Description

Design a time-based key-value data structure that can store multiple values
for the same key at different time stamps and retrieve the key's value at a
certain timestamp.

Implement the `TimeMap` class:

- `TimeMap()` Initializes the object of the data structure.
- `void set(String key, String value, int timestamp)` Stores the key `key`
  with the value `value` at the given time `timestamp`.
- `String get(String key, int timestamp)` Returns a value such that `set` was
  called previously, with `timestamp_prev <= timestamp`. If there are multiple
  such values, it returns the value associated with the largest
  `timestamp_prev`. If there are no values, it returns `""`.

### Example 1

```text
Input:
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output: [null, null, "bar", "bar", null, "bar2", "bar2"]
Explanation:
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
```

### Constraints

- `1 <= key.length, value.length <= 100`
- `key` and `value` consist of lowercase English letters and digits.
- `1 <= timestamp <= 10⁷`
- All the timestamps `timestamp` of `set` are strictly increasing.
- At most `2 * 10⁵` calls will be made to `set` and `get`.

## Hints

### Hint 1

The values written for one key form a history, and `get` asks for the newest
entry that is still not newer than the query. Because `set` timestamps are
strictly increasing, appending keeps each key's history sorted by timestamp —
no re-sorting is ever needed.

### Hint 2

Bucket the histories by key in a hash map (parallel value and timestamp
lists), so a `get` touches only one key's entries. "Newest entry at or before
`t`" is then a search for the rightmost timestamp `<= t` — a binary search,
since the list is sorted.

### Hint 3

Search for the first timestamp strictly greater than `t`; the entry before
that position is the answer. When no timestamp is `<= t` — the query predates
every write for that key, or the key was never written — there is no entry
before the position, and the answer is the empty string `""`.
