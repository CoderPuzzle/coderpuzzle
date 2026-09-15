# Factorial Generator

## Description

Write a generator function that takes an integer n as an argument and
returns a generator object which yields the factorial sequence.

The factorial sequence is defined by the relation
n! = n * (n-1) * (n-2) * ... * 2 * 1.

The factorial of 0 is defined as 1.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines a generator function `factorial(n)` that
yields one factorial per step, and declares a class `Solution` whose
`run(genCase)` hands that function to the bundle-provided case carrier:
`genCase.drive(factorial)`. The driver calls the generator with this
case's `n`, advances the returned generator by repeated `.next()` calls
until it reports done, and the judge compares the array of collected
`.value` numbers — the yielded factorials in yield order — against the
expected list exactly. The generator object itself never crosses the
wire; only its yielded numbers are judged.

### Example 1

```text
Input: n = 5
Output: [1,2,6,24,120]
Explanation:
const gen = factorial(5)
gen.next().value // 1
gen.next().value // 2
gen.next().value // 6
gen.next().value // 24
gen.next().value // 120
```

### Example 2

```text
Input: n = 2
Output: [1,2]
Explanation:
const gen = factorial(2)
gen.next().value // 1
gen.next().value // 2
```

### Example 3

```text
Input: n = 0
Output: [1]
Explanation:
const gen = factorial(0)
gen.next().value // 1
```

### Constraints

- 0 <= n <= 18
