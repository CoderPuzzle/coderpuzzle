# Solutions — Design Auction System

One structure answers every method: keep, per item, a max-heap of
`(bidAmount, userId)` keys so the top is by definition the highest bid with
the highest-id bidder on ties, and keep the heap lazy.

## Lazy-deletion heaps keyed by (amount, userId)

Deleting an arbitrary element from a heap is awkward, but the contract
never asks for it by position: `addBid` and `updateBid` both _replace_ a
user's entry and `removeBid` retires one, so it suffices to leave the old
heap entries in place and mark them dead. Each push stamps a unique
sequence number, and a `latestSeq` map records the newest stamp per
`(userId, itemId)` pair; an entry is live exactly when its stamp is still
the pair's newest. `addBid`/`updateBid` advance the stamp and push a fresh
`(-amount, -userId, seq)` entry — the ordering by amount first and userId
second is precisely the stated tie-break — and `removeBid` simply drops
the pair from the map. `getHighestBidder` pops the top while its stamp is
outdated, then reads the survivor's userId, or returns `-1` once the heap
drains.

Every stale entry is pushed once and popped at most once, so each of the
four operations runs in `O(log M)` amortized time, where `M` is the number
of `addBid`/`updateBid` calls made so far. The heaps together hold one
entry per push, so the footprint is `O(M)` space in the worst case — the
price of never reshuffling on removal.

**Complexity:** `O(log M)` amortized time per operation (`M` total
`addBid`/`updateBid` calls), `O(M)` space.
