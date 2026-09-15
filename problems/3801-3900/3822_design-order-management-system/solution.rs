use std::collections::HashMap;
use std::collections::HashSet;

// Two maps in lockstep: orders maps orderId -> its packed (type, price)
// key so modify/cancel find the attributes in one lookup, and buckets maps
// the packed key -> the set of ids at that key, so a query reads exactly
// its bucket. The key packs the type bit above 30 price bits (price
// <= 10^9 < 2^30). Queries return sorted ids — the statement frees the
// order.
pub struct OrderManagementSystem {
    orders: HashMap<i32, u64>,
    buckets: HashMap<u64, HashSet<i32>>,
}

const TYPE_BIT: u64 = 1 << 30;

fn key(order_type: &str, price: i32) -> u64 {
    let mut key = price as u64;
    if order_type == "sell" {
        key |= TYPE_BIT;
    }
    key
}

impl OrderManagementSystem {
    pub fn new() -> Self {
        OrderManagementSystem {
            orders: HashMap::new(),
            buckets: HashMap::new(),
        }
    }

    pub fn addOrder(&mut self, orderId: i32, orderType: String, price: i32) {
        let key = key(&orderType, price);
        self.orders.insert(orderId, key);
        self.buckets.entry(key).or_default().insert(orderId);
    }

    pub fn modifyOrder(&mut self, orderId: i32, newPrice: i32) {
        let old_key = *self.orders.get(&orderId).expect("order exists");
        self.buckets.get_mut(&old_key).expect("bucket exists").remove(&orderId);
        let new_key = (old_key & TYPE_BIT) | newPrice as u64;
        self.orders.insert(orderId, new_key);
        self.buckets.entry(new_key).or_default().insert(orderId);
    }

    pub fn cancelOrder(&mut self, orderId: i32) {
        if let Some(old_key) = self.orders.remove(&orderId) {
            if let Some(bucket) = self.buckets.get_mut(&old_key) {
                bucket.remove(&orderId);
            }
        }
    }

    pub fn getOrdersAtPrice(&mut self, orderType: String, price: i32) -> Vec<i32> {
        let mut ids: Vec<i32> = self
            .buckets
            .get(&key(&orderType, price))
            .map(|bucket| bucket.iter().copied().collect())
            .unwrap_or_default();
        ids.sort_unstable();
        ids
    }
}
