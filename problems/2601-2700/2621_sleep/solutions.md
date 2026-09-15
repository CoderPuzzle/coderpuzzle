# Solutions — Sleep

## Timer-Scheduled Promise

The whole problem is turning a callback-style timer into an awaited value:
`new Promise` captures its `resolve` function, hands it to `setTimeout`,
and the promise sits unsettled until the timer queue fires `resolve`
exactly `millis` milliseconds later. Marking the wrapper async is almost a
formality once it returns that promise, but it makes callers able to write
plain `await sleep(ms)` — and LeetCode's harness reads it as exactly such
an asynchronous function.

Why not a busy-wait loop (`while (Date.now() - start < millis)`)? It would
pass the timing check while pinning one CPU core and blocking the entire
event loop — no other timer, I/O callback, or microtask could run for the
whole sleep. setTimeout costs nothing while idle: the thread parks in the
platform's timer primitive until the kernel wakes it. Node's timer wheel
rounds to whole milliseconds and may fire a hair late under load — which
the statement's "minor deviation" note accepts — but it can never fire
meaningfully early, so the lower edge of the window is where correctness
lives.

**Complexity:** `O(1)` time, `O(1)` space.
