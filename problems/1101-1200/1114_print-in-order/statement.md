# Print in Order

## Description

Suppose we have a class:

```text
public class Foo {
  public void first() { print("first"); }
  public void second() { print("second"); }
  public void third() { print("third"); }
}
```

The same instance of `Foo` will be passed to three different threads. Thread
A will call `first()`, thread B will call `second()`, and thread C will call
`third()`. Design a mechanism and modify the program to ensure that
`second()` is executed after `first()`, and `third()` is executed after
`second()`.

Note:

We do not know how the threads will be scheduled in the operating system,
even though the numbers in the input seem to imply the ordering. The input
format you see is mainly to ensure our tests' comprehensiveness.

Implement the `Foo` class:

- `Foo()` Initializes the object.
- `void first(Runnable printFirst)` Calls `printFirst.run()` to output
  `"first"`.
- `void second(Runnable printSecond)` Calls `printSecond.run()` to output
  `"second"`.
- `void third(Runnable printThird)` Calls `printThird.run()` to output
  `"third"`.

### Concurrent judging

The judge starts one real thread per entry of the schedule — one calling
`first`, one calling `second`, one calling `third` — all sharing one `Foo`
object, started in the schedule's order, which tells your solution nothing
about when each thread actually runs. Each callback appends its token to a
shared log, so the log is the interleaving your synchronization actually
produced. Exactly one log is correct: `"first"`, then `"second"`, then
`"third"`. A solution that deadlocks never returns and is judged as a
timeout.

### Example 1

```text
Input: nums = [1,2,3]
Output: "firstsecondthird"
Explanation: There are three threads being fired asynchronously. The input
[1,2,3] means thread A calls first(), thread B calls second(), and thread C
calls third(). "firstsecondthird" is the correct output.
```

### Example 2

```text
Input: nums = [1,3,2]
Output: "firstsecondthird"
Explanation: The input [1,3,2] means thread A calls first(), thread B calls
third(), and thread C calls second(). "firstsecondthird" is the correct
output.
```

### Constraints

- `nums` is a permutation of `[1, 2, 3]`.
