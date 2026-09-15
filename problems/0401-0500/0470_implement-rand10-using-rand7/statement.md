# Implement Rand10() Using Rand7()

## Description

Given the API `rand7()` that generates a uniform random integer in the range
`[1, 7]`, write a function `rand10()` that generates a uniform random integer
in the range `[1, 10]`. You can only call the API `rand7()`, and you
shouldn't call any other API. Please do not use a language's built-in random
API.

Because `rand10()` is random, this judge tests it deterministically: instead
of calling `rand7()` live, your function receives `rand7_outputs` — the list
of values that `rand7()` will return, in call order. Every internal call to
`rand7()` consumes the next value from the list, two values per draw.

Implement `rand10()` with the standard rejection sampling construction:
repeatedly draw `a = rand7()` and `b = rand7()`, form
`idx = (a - 1) * 7 + b` (uniform over `1..49`), and if `idx <= 40` return
`((idx - 1) mod 10) + 1`; otherwise discard the pair and draw again. Return
the first value this algorithm produces from the provided outputs. Every
test provides enough outputs for the algorithm to terminate.

### Example 1

```text
Input: rand7_outputs = [1,1]
Output: 1
Explanation: idx = (1-1)*7 + 1 = 1, so rand10() returns ((1-1) mod 10) + 1 = 1.
```

### Example 2

```text
Input: rand7_outputs = [1,2]
Output: 2
Explanation: idx = (1-1)*7 + 2 = 2, so rand10() returns ((2-1) mod 10) + 1 = 2.
```

### Constraints

- `1 <= rand7_outputs.length <= 10^5`
- `1 <= rand7_outputs[i] <= 7`

### Follow up

- What is the expected value for the number of calls to the `rand7()`
  function?
- Could you minimize the number of calls to `rand7()`?

## Hints

### Hint 1

Two calls to rand7() give 49 equally likely pairs; map them onto 1..49 with idx = (a - 1) * 7 + b.

### Hint 2

Reject idx values above 40 and redraw, so the 40 kept values are uniform; return ((idx - 1) mod 10) + 1.

### Hint 3

Consume the recorded rand7_outputs strictly in order, two values per draw, discarding both halves of a rejected pair.
