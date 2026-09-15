// Two maps in lockstep: orders maps orderId -> its packed (type, price)
// key so modify/cancel find the attributes in one lookup, and buckets maps
// the packed key -> the set of ids at that key, so a query reads exactly
// its bucket. The key packs the type bit above 30 price bits
// (price <= 1e9 < 2^30), so it stays an exact integer. Queries return
// sorted ids — the statement frees the order.
const TYPE_BIT = 1 << 30;

class OrderManagementSystem {
    constructor() {
        this.orders = new Map(); // orderId -> packed (type, price) key
        this.buckets = new Map(); // packed key -> Set of orderIds
    }

    addOrder(orderId, orderType, price) {
        const key = pack(orderType, price);
        this.orders.set(orderId, key);
        this.bucket(key).add(orderId);
    }

    modifyOrder(orderId, newPrice) {
        const oldKey = this.orders.get(orderId);
        this.buckets.get(oldKey).delete(orderId);
        const newKey = (oldKey & TYPE_BIT) | newPrice; // keep the type bit
        this.orders.set(orderId, newKey);
        this.bucket(newKey).add(orderId);
    }

    cancelOrder(orderId) {
        this.buckets.get(this.orders.get(orderId)).delete(orderId);
        this.orders.delete(orderId);
    }

    getOrdersAtPrice(orderType, price) {
        const bucket = this.buckets.get(pack(orderType, price));
        if (!bucket) {
            return [];
        }
        return [...bucket].sort((a, b) => a - b);
    }

    bucket(key) {
        let bucket = this.buckets.get(key);
        if (!bucket) {
            bucket = new Set();
            this.buckets.set(key, bucket);
        }
        return bucket;
    }
}

function pack(orderType, price) {
    return ((orderType === "sell" ? 1 : 0) * TYPE_BIT) | price;
}
