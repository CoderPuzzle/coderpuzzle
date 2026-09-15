# Solutions — Bag of Tokens

Every face-up trades power for a point; every face-down trades a point for
power. The whole game is deciding which tokens to buy points with and which
to sell for power, and once the bag is sorted those decisions line up along
a single two-pointer walk.

## Buy at the front, sell at the back

An optimal plan never buys a point with a dearer token while a cheaper one
sits unplayed — the exchange keeps the score and leaves power no smaller —
and by the same argument never sells a cheaper token for power while a
dearer one is available. So after sorting, points come from the front and
power from the back: while the cheapest remaining token is affordable, play
it face-up; when it is not, and a point is in hand with at least one further
token left to spend the refilled power on, play the most expensive remaining
token face-down.

Each face-down costs a point, so the walking score rises and dips and the
answer is the peak seen along the way, not the value where the walk stops —
a refill pays off only through the face-ups it unlocks afterwards. Example 3
traces exactly one such cycle: buy 100, sell 400, then buy 200 and 300 for a
peak of 2, while Example 1 never gets moving at all. The walk halts when the
cheapest token is unaffordable and no legal refill exists.

There are at most 1000 tokens, each below 10⁴ in value, so even a fully
refilled power stays under about 10⁷ — comfortably inside the 32-bit
integers the signature already uses.

**Complexity:** `O(n log n)` time, `O(1)` space.
