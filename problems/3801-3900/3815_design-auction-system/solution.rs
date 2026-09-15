use std::collections::BinaryHeap;
use std::collections::HashMap;

// Per item, a lazy-deletion max-heap of (-amount, -userId, seq) entries:
// the top is the live leader once every stale top has been popped. A seq
// map names the newest entry per (userId, itemId) pair, so addBid/updateBid
// just push a newer entry (the old one turns stale by its seq) and
// removeBid drops the pair. The heap orders by amount first, userId
// second, which is exactly the stated tie-break.
#[derive(PartialEq, Eq)]
struct AuctionEntry {
    neg_amount: i64,
    neg_user: i32,
    seq: u64,
}

impl Ord for AuctionEntry {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        // Reversed on (neg_amount, neg_user): BinaryHeap is a max-heap, so
        // the "greatest" entry must be the best bid (highest amount, then
        // highest userId).
        other
            .neg_amount
            .cmp(&self.neg_amount)
            .then_with(|| other.neg_user.cmp(&self.neg_user))
            .then_with(|| other.seq.cmp(&self.seq))
    }
}

impl PartialOrd for AuctionEntry {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

pub struct AuctionSystem {
    heaps: HashMap<i32, BinaryHeap<AuctionEntry>>,
    latest_seq: HashMap<(i32, i32), u64>,
    clock: u64,
}

impl AuctionSystem {
    pub fn new() -> Self {
        AuctionSystem {
            heaps: HashMap::new(),
            latest_seq: HashMap::new(),
            clock: 0,
        }
    }

    pub fn addBid(&mut self, userId: i32, itemId: i32, bidAmount: i32) {
        self.push(userId, itemId, bidAmount);
    }

    pub fn updateBid(&mut self, userId: i32, itemId: i32, newAmount: i32) {
        self.push(userId, itemId, newAmount);
    }

    pub fn removeBid(&mut self, userId: i32, itemId: i32) {
        self.latest_seq.remove(&(userId, itemId));
    }

    pub fn getHighestBidder(&mut self, itemId: i32) -> i32 {
        if let Some(heap) = self.heaps.get_mut(&itemId) {
            while let Some(top) = heap.peek() {
                if self.latest_seq.get(&(-top.neg_user, itemId)) == Some(&top.seq) {
                    return -top.neg_user;
                }
                heap.pop();
            }
        }
        -1
    }

    fn push(&mut self, userId: i32, itemId: i32, amount: i32) {
        self.clock += 1;
        self.latest_seq.insert((userId, itemId), self.clock);
        self.heaps.entry(itemId).or_default().push(AuctionEntry {
            neg_amount: -(amount as i64),
            neg_user: -userId,
            seq: self.clock,
        });
    }
}
