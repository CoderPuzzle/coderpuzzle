// A plain key -> value hash map: no nodes, no per-insert maintenance. insert()
// stores the pair and stops -- the map carries no structure beyond the
// pairs themselves -- and sum() pays for that at query time,
// scanning every stored key and summing the values of those that start
// with the prefix.
class MapSum {
    private values = new Map<string, number>();

    constructor() {}

    insert(key: string, val: number): void {
        this.values.set(key, val);
    }

    sum(prefix: string): number {
        let total = 0;
        for (const [key, val] of this.values) {
            if (key.startsWith(prefix)) {
                total += val;
            }
        }
        return total;
    }
}
