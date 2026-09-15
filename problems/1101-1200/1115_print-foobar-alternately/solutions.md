# Solutions — Print FooBar Alternately

## Two semaphores passed back and forth

The required log is strict alternation starting with `"foo"`, which is a
hand-off protocol: whoever is allowed to print holds the single permit, and
printing is what transfers it. Two semaphores encode this directly — one
guarding `"foo"`, initialized with 1 permit, and one guarding `"bar"`,
initialized with 0.

Each method runs its `n` iterations of the same three steps: acquire your own
semaphore (blocking while it is the other side's turn), call the print
callback, and release the other side's semaphore. Because `bar` starts with
zero permits, the very first `bar` iteration parks until `foo` has printed;
after that the two permits shuttle between the threads, one print per
transfer, so the emitted sequence is `foobar` repeated `n` times whatever
order the threads were started in. When both loops finish, each semaphore has
been released exactly as often as acquired and both threads simply return.

The loop counter is the only per-thread state and the two semaphores are the
only shared state, so nothing needs resetting between iterations and the
protocol needs no knowledge of `n` beyond the loop bounds.

**Complexity:** `O(n)` time and `O(1)` space — `2n` prints, each preceded by
one acquire and followed by one release over two constant-size semaphores.
