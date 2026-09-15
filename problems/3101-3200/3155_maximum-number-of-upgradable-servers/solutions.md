# Solutions — Maximum Number of Upgradable Servers

Each data center is an independent economy: its own servers, prices, and
cash, with no money flowing between centers. Within one center a plan
just picks how many servers to upgrade; any server left un-upgraded can
be sold, and every sale adds its price to the budget. So upgrading `u`
servers works exactly when `u * upgrade[i]` fits inside the largest pool
available — `money[i]` plus the proceeds of everything not upgraded — and
when it does not fit, selling more always helps while upgrading one more
only demands more. That monotone shape means each center's answer is the
largest `u` below a single feasibility boundary.

## Binary search on the upgrade count

For one center test a candidate `u`: if `u * upgrade <= money`, nothing
needs selling. Otherwise the shortfall `(u * upgrade - money)` must be
bridged by sales, and the minimum number of servers to sell is the
ceiling of `shortfall / sell`; the plan survives only if those sold
servers plus the upgraded ones still fit within `count`. Feasibility is
true at `u = 0` and can flip from true to false only once as `u` grows,
so a binary search on `u` over `[0, count]` pins down the maximum in
about seventeen probes at these bounds.

One care point: the products reach `10^5 * 10^5 = 10^10`, past 32-bit
range — compute them in 64-bit types (Java `long`, C++ `long long`, Go
`int64`, Rust `i64`). Python integers are unbounded, and JS/TS Numbers
are exact here because every intermediate stays below 2⁵³ ≈ 9·10¹⁵;
the JS/TS code also derives its ceiling from floor plus exact remainder,
avoiding drift from double division near 10¹⁰. Centers never interact,
so the loop simply collects each center's answer into `answer`.

**Complexity:** `O(n log(max count))` time, `O(1)` extra space.
