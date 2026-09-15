# Design Front Middle Back Queue

## Description

Design a queue that supports push and pop operations at the front, the
middle, and the back.

Implement the `FrontMiddleBackQueue` class:

- `FrontMiddleBackQueue()` initializes the queue.
- `void pushFront(int val)` adds `val` to the front of the queue.
- `void pushMiddle(int val)` adds `val` to the middle of the queue.
- `void pushBack(int val)` adds `val` to the back of the queue.
- `int popFront()` removes the front element of the queue and returns it.
  If the queue is empty, return `-1`.
- `int popMiddle()` removes the middle element of the queue and returns
  it. If the queue is empty, return `-1`.
- `int popBack()` removes the back element of the queue and returns it.
  If the queue is empty, return `-1`.

Notice that when there are two middle position choices, the operation is
performed on the frontmost middle position choice. For example:

- Pushing `6` into the middle of `[1, 2, 3, 4, 5]` results in
  `[1, 2, 6, 3, 4, 5]`.
- Popping the middle from `[1, 2, 3, 4, 5, 6]` returns `3` and results
  in `[1, 2, 4, 5, 6]`.

### Example 1

```text
Input:
["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
[[], [1], [2], [3], [4], [], [], [], [], []]
Output: [null, null, null, null, null, 1, 3, 4, 2, -1]
Explanation:
FrontMiddleBackQueue q = new FrontMiddleBackQueue();
q.pushFront(1);   // [1]
q.pushBack(2);    // [1, 2]
q.pushMiddle(3);  // [1, 3, 2]
q.pushMiddle(4);  // [1, 4, 3, 2]
q.popFront();     // return 1 -> [4, 3, 2]
q.popMiddle();    // return 3 -> [4, 2]
q.popMiddle();    // return 4 -> [2]
q.popBack();      // return 2 -> []
q.popFront();     // return -1 -> [] (The queue is empty)
```

### Constraints

- `1 <= val <= 10⁹`
- At most `1000` calls will be made to `pushFront`, `pushMiddle`,
  `pushBack`, `popFront`, `popMiddle`, and `popBack`.

## Hints

### Hint 1

The call limit is low enough for a brute-force, single-array approach.

### Hint 2

For an `O(1)` per method approach, use 2 double-ended queues: one for
the first half and one for the second half.
