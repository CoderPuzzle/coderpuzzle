# Fizz Buzz Multithreaded

## Description

You have the four functions:

- `printFizz` that prints the word `"fizz"` to the console,
- `printBuzz` that prints the word `"buzz"` to the console,
- `printFizzBuzz` that prints the word `"fizzbuzz"` to the console, and
- `printNumber` that prints a given integer to the console.

You are given an instance of the class `FizzBuzz` that has four functions:
`fizz`, `buzz`, `fizzbuzz` and `number`. The same instance of `FizzBuzz` will be
passed to four different threads:

- Thread A: calls `fizz()` that should output the word `"fizz"`.
- Thread B: calls `buzz()` that should output the word `"buzz"`.
- Thread C: calls `fizzbuzz()` that should output the word `"fizzbuzz"`.
- Thread D: calls `number()` that should only output the integers.

Modify the given class to output the series `[1, 2, "fizz", 4, "buzz", ...]` where
the `ith` token (1-indexed) of the series is:

- `"fizzbuzz"` if `i` is divisible by 3 and 5,
- `"fizz"` if `i` is divisible by 3 and not 5,
- `"buzz"` if `i` is divisible by 5 and not 3, or
- `i` if `i` is not divisible by 3 or 5.

Implement the `FizzBuzz` class:

- `FizzBuzz(int n)` Initializes the object with the number `n` that represents
  the length of the sequence that should be printed.
- `void fizz(printFizz)` Calls `printFizz` to output `"fizz"`.
- `void buzz(printBuzz)` Calls `printBuzz` to output `"buzz"`.
- `void fizzbuzz(printFizzBuzz)` Calls `printFizzBuzz` to output `"fizzbuzz"`.
- `void number(printNumber)` Calls `printnumber` to output the numbers.

### Concurrent judging

The judge starts one real thread per entry of the schedule — one each calling
`fizz`, `buzz`, `fizzbuzz`, and `number` — all sharing one `FizzBuzz` object,
started in the schedule's order, which tells your solution nothing about when
each thread actually runs. The three word callbacks append their token to a
shared log, and each `printNumber(value)` call appends the value it is handed,
so the log is the series your synchronization actually produced. Exactly one
series is correct: for every `i` from `1` to `n` in order, the `ith` token as
defined above. A solution that deadlocks never returns and is judged as a
timeout.

### Example 1

```text
Input: n = 15
Output: [1,2,"fizz",4,"buzz","fizz",7,8,"fizz","buzz",11,"fizz",13,14,"fizzbuzz"]
```

### Example 2

```text
Input: n = 5
Output: [1,2,"fizz",4,"buzz"]
```

### Constraints

- `1 <= n <= 50`
