# Solutions — Best Time to Buy and Sell Stock with Cooldown

## Three-State Machine DP

Each day ends in exactly one of three states, and the solution sweeps the prices once keeping the best achievable wealth in each: `hold` (owning a share), `sold` (just sold today), and `rest` (owning nothing and free to buy). Wealth is measured as cash plus the cost basis handled implicitly, so `hold` is initialized to a large negative sentinel (owning a share before any purchase is impossible) while the others start at zero.

The transitions encode the rules. Selling moves `hold → sold` as `sold = hold + price` (selling into today's price). Resting carries the better of staying at rest or absorbing a previous sale: `rest = max(rest, prev_sold)`, where `prev_sold` is cached before the updates — this is the cooldown. Because `rest` is only updated from _yesterday's_ `sold`, a sale on day `i` cannot fund a new purchase on day `i + 1`; the earliest rebuy is day `i + 2`, exactly the one-day cooldown.

Buying enters the holding state as `hold = max(hold, rest - price)`: either keep the share already held, or spend `price` from yesterday's rest wealth (yesterday's `rest`, since it is updated after `hold` reads it). The single-pass variable ordering — save `prev_sold` first, then update `hold`, `sold`, `rest` — is what makes each day depend only on day-before quantities.

The final answer is `max(sold, rest)`: after the last day, ending while holding a share is worthless since an unsold purchase only ever subtracted from wealth. A single-day input returns 0 (buying and "selling" the same day nets zero via `rest - price + price`), and a strictly decreasing price list never beats doing nothing.

**Complexity:** `O(n)` time, `O(1)` space.
