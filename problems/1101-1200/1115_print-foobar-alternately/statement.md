# Print FooBar Alternately

## Description

Suppose you are given the following code:

```text
class FooBar {
  public void foo() {
    for (int i = 0; i < n; i++) {
      print("foo");
    }
  }

  public void bar() {
    for (int i = 0; i < n; i++) {
      print("bar");
    }
  }
}
```

The same instance of `FooBar` will be passed to two different threads:

- thread A will call `foo()`, while
- thread B will call `bar()`.

Modify the given program to output `"foobar"` n times.

Implement the `FooBar` class:

- `FooBar(int n)` Initializes the object with the number of repetitions.
- `void foo(Runnable printFoo)` Calls `printFoo.run()` exactly `n` times.
- `void bar(Runnable printBar)` Calls `printBar.run()` exactly `n` times.

### Concurrent judging

The judge starts one real thread calling `foo` and one calling `bar`, both
sharing one `FooBar` object; the start order tells your solution nothing.
Each callback appends its token to a shared log, so the log is the
interleaving your synchronization actually produced. Exactly one log is
correct: `"foo"`, `"bar"`, `"foo"`, `"bar"`, … — `n` repetitions of the
pair. A solution that deadlocks never returns and is judged as a timeout.

### Example 1

```text
Input: n = 1
Output: "foobar"
Explanation: There are two threads being fired asynchronously. One of them
calls foo(), while the other calls bar(). "foobar" is being output 1 time.
```

### Example 2

```text
Input: n = 2
Output: "foobarfoobar"
Explanation: "foobar" is being output 2 times.
```

### Constraints

- `1 <= n <= 1000`
