# Solutions — Design Cancellable Function

## Promise Stepper with Cancellation Race

`cancellable` returns a promise whose executor starts one recursive
stepper. The stepper advances the generator with `next()`; every yielded
promise gets two continuations — its fulfillment resumes the generator via
`next(value)`, its rejection re-enters it via `throw(error)` — so values
and failures flow back into the generator body exactly where it yielded,
in both directions the protocol demands. Wrapping only the raw
`generator.next`/`generator.throw` call in a try/catch localizes the two
ways an error escapes: a rejection thrown into a generator that never
catches it, or the generator's own unguarded throw, and either rejects the
returned promise.

Cancellation is not a special path at all: the cancel closure simply calls
the same stepper with `throw("Cancelled")`, so a generator that catches
the string keeps running (Example 5 returns its partial sum; a caught
cancel can even go on yielding further promises, which are serviced as
usual), while an uncaught one lands in the try/catch and rejects with
`"Cancelled"` itself. A `settled` flag makes every later step a no-op once
resolve or reject has fired — Promise settlement is already one-shot, but
the flag also stops the stepper from calling `generator.throw` on a
finished generator when cancel arrives late (Example 1's no-op case).

On CoderPuzzle the whole timeline runs on a virtual clock captured by the
bundle-provided driver, so both the generator internals' timers and the
scheduled cancel arm against one deterministic schedule; only relative
settlement order matters for the outcome.

**Complexity:** `O(P)` time over `P` yielded promises (each stepped a
constant number of times), `O(1)` space beyond the promise chain.
