# Solutions — Factorial Trailing Zeroes

## Counting factors of five

A trailing zero of `n!` is a factor `10 = 2 * 5`, and in the product `n * (n - 1) * ... * 2 * 1` the twos can never be the bottleneck: every second factor contributes a 2 while only every fifth contributes a 5. The number of trailing zeroes is therefore exactly the number of factors of 5 in `n!`, and Legendre's formula counts those without ever forming the factorial — `n / 5` credits each multiple of 5 with one five, `n / 25` credits every multiple of 25 with its second, `n / 125` the third, and so on. The loop adds `n / power` for `power = 5, 25, 125, ...` until the power passes `n`, which is six divisions at the constraint ceiling — against the 35,660 digits of `10000!` that computing the factorial and inspecting it would cost.

The sum also explains the jumps. Between `n = 24` and `n = 25` the answer leaps from 4 to 6, not to 5: the arriving factor 25 carries two fives at once, credited by both the `n / 5` term and the `n / 25` term. Every crossing of a higher power of 5 behaves the same way (`124` gives 28 but `125` gives 31), and just past a crossing the answer holds flat (`126` is still 31) because nothing new arrives. At `n = 0` the loop never runs: `0! = 1` has no trailing zero, and the empty sum returns 0.

The one language note is the power accumulator. The first power of 5 past a large `n` is `5^14 = 6103515625`, beyond the 32-bit range, so Java, C++, and Rust hold `power` in a 64-bit type — a wrapped-negative accumulator would satisfy `power <= n` forever and hang the loop. Go's `int` is already 64-bit, Python integers are unbounded, and JavaScript numbers are exact through `2^53`, far above anything this loop touches.

**Complexity:** `O(log n)` time — one iteration per power of 5 not exceeding `n` — and `O(1)` space.
