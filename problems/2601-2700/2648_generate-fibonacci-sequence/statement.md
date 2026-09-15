# Generate Fibonacci Sequence

## Description

Write a generator function that returns a generator object which yields
the fibonacci sequence.

The fibonacci sequence is defined by the relation `Xn = Xn-1 + Xn-2`.

The first few numbers of the series are 0, 1, 1, 2, 3, 5, 8, 13.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines a generator function `fibGenerator()` that
yields the sequence, and declares a class `Solution` whose `run(fibCase)`
hands that function to the bundle-provided case carrier:
`fibCase.drive(fibGenerator)`. The driver calls `fibGenerator()`, steps
the returned generator exactly this case's `callCount` times via repeated
`.next()` calls, and the judge compares the array of collected `.value`
numbers — the first `callCount` Fibonacci numbers in yield order — against
the expected list exactly. The generator object itself never crosses the
wire; only its yielded numbers are judged, and a generator that finishes
before `callCount` yields is rejected because the true sequence is
infinite.

### Example 1

```text
Input: callCount = 5
Output: [0,1,1,2,3]
Explanation:
const gen = fibGenerator();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
```

### Example 2

```text
Input: callCount = 0
Output: []
Explanation: gen.next() is never called so nothing is outputted
```

### Constraints

- `0 <= callCount <= 50`
