// Two maps in lockstep: orders maps orderId -> its packed (type, price)
// key so modify/cancel find the attributes in one lookup, and buckets maps
// the packed key -> the set of ids at that key, so a query reads exactly
// its bucket. The key packs the type bit above 30 price bits
// (price <= 1e9 < 2^30), so it stays an exact integer. Queries return
// sorted ids — the statement frees the order.
const TYPE_BIT = 1 << 30;

class OrderManagementSystem {
    private orders: Map<number, number>; // orderId -> packed (type, price) key
    private buckets: Map<number, Set<number>>; // packed key -> ids at that key

    constructor() {
        this.orders = new Map();
        this.buckets = new Map();
    }

    addOrder(orderId: number, orderType: string, price: number): void {
        const key = pack(orderType, price);
        this.orders.set(orderId, key);
        this.bucket(key).add(orderId);
    }

    modifyOrder(orderId: number, newPrice: number): void {
        const oldKey = this.orders.get(orderId)!;
        this.buckets.get(oldKey)!.delete(orderId);
        const newKey = (oldKey & TYPE_BIT) | newPrice; // keep the type bit
        this.orders.set(orderId, newKey);
        this.bucket(newKey).add(orderId);
    }

    cancelOrder(orderId: number): void {
        this.buckets.get(this.orders.get(orderId)!)!.delete(orderId);
        this.orders.delete(orderId);
    }

    getOrdersAtPrice(orderType: string, price: number): number[] {
        const bucket = this.buckets.get(pack(orderType, price));
        if (!bucket) {
            return [];
        }
        return [...bucket].sort((a, b) => a - b);
    }

    private bucket(key: number): Set<number> {
        let bucket = this.buckets.get(key);
        if (!bucket) {
            bucket = new Set();
            this.buckets.set(key, bucket);
        }
        return bucket;
    }
}

function pack(orderType: string, price: number): number {
    return ((orderType === "sell" ? 1 : 0) * TYPE_BIT) | price;
}
