# Push Dominoes

## Description

There are `n` dominoes in a line, and we place each domino vertically
upright. In the beginning, we simultaneously push some of the dominoes either
to the left or to the right.

After each second, each domino that is falling to the left pushes the adjacent
domino on the left. Similarly, the dominoes falling to the right push their
adjacent dominoes standing on the right.

When a vertical domino has dominoes falling on it from both sides, it stays
still due to the balance of the forces.

For the purposes of this question, we will consider that a falling domino
expends no additional force to a falling or already fallen domino.

You are given a string `dominoes` representing the initial state where:

- `dominoes[i] = 'L'` if the `i`-th domino has been pushed to the left,
- `dominoes[i] = 'R'` if the `i`-th domino has been pushed to the right, and
- `dominoes[i] = '.'` if the `i`-th domino has not been pushed.

Return a string representing the final state.

### Example 1

```text
Input: dominoes = "RR.L"
Output: "RR.L"
Explanation: The first domino expends no additional force on the second domino.
```

### Example 2

```text
Input: dominoes = ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."
```

![The dominoes before and after the pushes; dominoes 2 and 5 stay balanced and 12 and 13 are never reached.](figures/example-2.svg)

### Constraints

- `n == dominoes.length`
- `1 <= n <= 10^5`
- `dominoes[i]` is either `'L'`, `'R'`, or `'.'`.

## Hints

### Hint 1

Scan left to right tracking the strength of the rightward force, which decays by 1 per step away from the nearest 'R'.

### Hint 2

Scan right to left doing the same for leftward force, and subtract it from the first pass.

### Hint 3

Compare the two net forces at each position: positive means 'R', negative means 'L', zero means the domino stays '.'.
