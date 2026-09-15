# Solutions — Counter

## Closure-State Capture

`createCounter` returns an inner arrow that closes over one `count`
variable declared in the outer scope. The outer call seeds it once; each
inner call reads and then advances that same slot, so the sequence is a
pure function of the closure's private state — nothing global, nothing on
the function object itself, no second call can ever restart it. Returning
a function that mutates captured variables like this is the textbook use
of lexical scope.

The counting itself rides on JavaScript's increment semantics: the
expression `count++` yields the current value first and then adds one,
which lands exactly on the required contract (first call reports `n`,
every subsequent call reports the previous answer plus one). A separate
statement pair would do the same work; the postfix form just keeps the
read-then-advance ordering in one place where it cannot drift out of sync.
Each invocation performs a constant handful of operations regardless of
how many calls came before, so replaying a schedule of `k` calls costs
linear total work for constant per-call space beyond the recorded output.

**Complexity:** `O(1)` time per call, `O(1)` space.
