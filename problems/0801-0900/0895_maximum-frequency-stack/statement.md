# Maximum Frequency Stack

## Description

Design a stack-like data structure to push elements to the stack and pop the
most frequent element from the stack.

Implement the `FreqStack` class:

- `FreqStack()` Constructs an empty frequency stack.
- `void push(int val)` Pushes an integer `val` onto the top of the stack.
- `int pop()` Removes and returns the most frequent element in the stack.

If there is a tie for the most frequent element, the element closest to the
stack's top is removed and returned.

### Example 1

```text
Input:
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
Output: [null, null, null, null, null, null, null, 5, 7, 5, 4]
Explanation:
FreqStack freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5]
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
freqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
freqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].
```

### Constraints

- `0 <= val <= 10⁹`
- At most `2 * 10⁴` calls will be made to `push` and `pop`.
- It is guaranteed that there will be at least one element in the stack before
  calling `pop`.

## Hints

### Hint 1

Two facts must be tracked at once: how many times each value has been pushed
(a hash map from value to count), and — for the tie-breaking rule — the order
in which equal-count occurrences were pushed. A single flat sequence cannot
answer "most frequent, then most recent" without a scan.

### Hint 2

Group occurrences by their count: bucket `f` receives a value exactly when
that value is pushed for the `f`-th time. Buckets are naturally stacks — the
top of bucket `f` is the most recent value to reach frequency `f`. Popping
when the maximum frequency is `F` takes the top of bucket `F`, which is by
construction the most recent value among the most frequent ones.

### Hint 3

Keep a running `maxfreq` instead of scanning buckets for the maximum: it rises
by one whenever a value reaches a new highest bucket, and when a pop empties
the top bucket it must fall by exactly one (no value can still have that
frequency — you just removed its only occurrence at that level). A popped
value stays in the bucket below, so its frequency simply decrements.
