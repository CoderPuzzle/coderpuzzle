# Design Bounded Blocking Queue

## Description

Implement a thread-safe bounded blocking queue.

Implement the `BoundedBlockingQueue` class:

- `BoundedBlockingQueue(int capacity)` Initializes the queue so that it holds
  at most `capacity` elements.
- `void enqueue(int element)` Adds `element` to the back of the queue. If the
  queue is full, the calling thread **blocks** until it is no longer full.
- `int dequeue()` Removes the element at the front of the queue and returns it.
  If the queue is empty, the calling thread **blocks** until it is no longer
  empty.
- `int size()` Returns the number of elements currently in the queue.

The object is used by many threads at once: every thread is either a producer
that only calls `enqueue` or a consumer that only calls `dequeue`. Blocking
must mean waiting, not spinning on a busy loop, and it must never lose an
element or hand the same element to two consumers.

Do not use a built-in bounded blocking queue — building the waiting and the
signalling yourself is the problem.

### Concurrent judging

The judge starts one real thread per scheduled call against a single queue: a
producer thread for each value to enqueue and one consumer thread for each
`dequeue`, all started in a shuffled order, so consumers routinely arrive
before there is anything to take and producers routinely arrive at a full
queue. Every schedule has as many consumers as producers, so a correct queue
always drains completely.

Two things are checked, and they mirror what LeetCode accepts. First, the
**multiset** of values returned by the consumers must equal the multiset that
was enqueued — which consumer gets which value is genuinely nondeterministic,
so the order is not compared, but every element must come out exactly once.
Second, the whole schedule must finish inside the time limit: a queue that
deadlocks never returns and is judged as a timeout. Note the honest
consequence of judging this way — a queue that simply never blocks also passes
these schedules, exactly as on LeetCode, so respecting `capacity` is on you.

`size()` is scheduled only on an idle queue, where its answer is
deterministic; alongside concurrent producers and consumers it would race, so
the judge never calls it there.

### Example 1

```text
Input:
capacity = 2
enqueued = [1, 0, 2, 3, 4]
consumers = 5
Output: [0, 1, 2, 3, 4]
Explanation: Five producer threads and five consumer threads run at once on a
queue that holds two elements. Producers block whenever both slots are taken
and consumers block whenever the queue is empty, but every value eventually
comes out exactly once. Any order of the same five values is accepted — for
example [1, 0, 2, 4, 3].
```

### Example 2

```text
Input:
capacity = 3
enqueued = [1, 0, 2, 3]
consumers = 4
Output: [0, 1, 2, 3]
Explanation: Four producer threads and four consumer threads share a queue of
capacity three. Because more than one thread is producing and more than one is
consuming, the operating system decides who wins each slot, so [1, 0, 2, 3],
[2, 3, 0, 1] and every other arrangement of these four values are equally
valid.
```

### Constraints

- `1 <= capacity <= 10`
- `0 <= n <= 30`, where `n` is both the number of producer threads and the
  number of consumer threads.
- `0 <= element <= 20`
- Every producer thread performs exactly one `enqueue` and every consumer
  thread exactly one `dequeue`.

## Hints

### Hint 1

The state to protect is small — the elements themselves plus their count — so
one mutual-exclusion lock around every operation is enough for safety. What a
plain lock cannot do is make a thread wait for a _condition_: a consumer
holding the lock on an empty queue must give the lock back while it waits, or
no producer could ever fill the queue.

### Hint 2

That is exactly what a condition variable does: waiting on it atomically
releases the lock and re-acquires it on wake-up. A producer waits while the
count equals `capacity`; a consumer waits while the count is zero. After
changing the queue, signal the condition the other side is waiting on, since
an enqueue is what makes the queue non-empty and a dequeue is what makes it
non-full.

### Hint 3

Always re-check the condition in a `while` loop rather than an `if`. A woken
thread has to re-acquire the lock, and another thread of the same kind may
have consumed the change in between — with several consumers, two can be woken
by one enqueue and only one of them may take the element. Two separate
condition variables, one for "not full" and one for "not empty", let you wake
only the side that can make progress.
