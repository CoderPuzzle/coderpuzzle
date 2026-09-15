# Design HashSet

## Description

Design a HashSet without using any built-in hash table libraries.

Implement the `MyHashSet` class:

- `MyHashSet()` Initializes the object.
- `void add(int key)` Inserts the value `key` into the HashSet.
- `bool contains(int key)` Returns whether the value `key` exists in the
  HashSet or not.
- `void remove(int key)` Removes the value `key` in the HashSet. If `key` does
  not exist in the HashSet, do nothing.

### Example 1

```text
Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)
```

### Constraints

- `0 <= key <= 10⁶`
- At most `10⁴` calls will be made to `add`, `remove`, and `contains`.
