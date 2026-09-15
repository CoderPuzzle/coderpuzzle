# Building H2O

## Description

Two kinds of threads run at the same time: **hydrogen** threads and **oxygen**
threads. Group them into water molecules.

There is a barrier where every thread waits until a complete molecule can be
formed. A hydrogen thread is handed a `releaseHydrogen` callback and an oxygen
thread a `releaseOxygen` callback; calling that callback passes the barrier and
emits this thread's atom — `"H"` or `"O"`. Threads must pass the barrier in
groups of three, bonding immediately, and every thread of one molecule must
pass before any thread of the next molecule does.

In other words:

- An oxygen thread that reaches the barrier while no hydrogen thread is waiting
  must wait for two hydrogen threads.
- A hydrogen thread that reaches the barrier while nothing else is waiting must
  wait for an oxygen thread and one more hydrogen thread.

The threads are never matched up explicitly — none of them learns which other
threads it bonded with. All that matters is that they pass the barrier in
complete sets: cutting the sequence of emitted atoms into consecutive groups of
three, every group must hold exactly two `"H"` and one `"O"`.

Implement the `H2O` class:

- `H2O()` Initializes the object.
- `void hydrogen(Runnable releaseHydrogen)` Blocks until this thread is allowed
  to bond, then calls `releaseHydrogen.run()` exactly once, emitting `"H"`.
- `void oxygen(Runnable releaseOxygen)` Blocks until this thread is allowed to
  bond, then calls `releaseOxygen.run()` exactly once, emitting `"O"`.

### Concurrent judging

The judge starts one real thread per character of `water` — a hydrogen thread
for every `'H'`, an oxygen thread for every `'O'` — all sharing one `H2O`
object, started in a shuffled order that tells your solution nothing about the
grouping. Each callback appends its atom to a shared log, so the log is the
interleaving your synchronization actually produced. There is no single
expected answer: **any** log passes whose every consecutive group of three
holds two `"H"` and one `"O"`, provided the schedule finishes inside the time
limit — a solution that deadlocks simply never returns and is judged as a
timeout.

### Example 1

```text
Input: water = "HOH"
Output: ["H", "H", "O"]
Explanation: One oxygen thread and two hydrogen threads run at once, and the
three atoms form a single molecule. ["H", "O", "H"] and ["O", "H", "H"] are
equally valid: every group of three holds two "H" and one "O".
```

### Example 2

```text
Input: water = "OOHHHH"
Output: ["H", "H", "O", "H", "H", "O"]
Explanation: Six threads run at once and form two molecules. The first three
emitted atoms must be one complete molecule and so must the last three, so
["H", "O", "H", "H", "H", "O"] and ["O", "H", "H", "H", "O", "H"] also pass,
while ["O", "O", "H", "H", "H", "H"] does not — its first group has two oxygen.
```

### Constraints

- `3 * n == water.length`
- `1 <= n <= 20`
- `water[i]` is either `'H'` or `'O'`.
- There are exactly `2 * n` occurrences of `'H'` in `water`.
- There are exactly `n` occurrences of `'O'` in `water`.

## Hints

### Hint 1

Two counting problems hide inside one: at most two hydrogen threads and at most
one oxygen thread may be inside the current molecule. A counting semaphore is
exactly that gate — one permitting two holders for hydrogen, one permitting a
single holder for oxygen. Acquire the permit before emitting, and the atoms of
any three emissions in flight are already the right mix.

### Hint 2

Permits alone are not enough: a hydrogen thread that emits and immediately
returns its permit lets the next molecule's hydrogen start before this
molecule's oxygen has emitted, which splits a group. The three threads must
therefore meet after emitting and leave together — a barrier that trips on
three arrivals does this, and it resets itself for the next molecule.

### Hint 3

Order the steps as acquire → emit → wait at the barrier → release the permit.
Releasing only after the barrier trips is what guarantees that all three atoms
of a molecule are already in the log before any thread of the next molecule can
acquire a permit, which is precisely the grouping the judge checks.
