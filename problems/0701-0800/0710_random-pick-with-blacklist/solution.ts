// The n - b allowed values are compressed into [0, n - b); each excluded
// value inside that range is remapped onto a free value from the upper
// part [n - b, n). pick() then makes exactly one random draw over the
// compressed range and follows the remap — uniform over exactly the
// allowed values.
class Solution {
    private size: number;
    private mapping: Map<number, number>;

    constructor(n: number, excluded: number[]) {
        const blocked = new Set(excluded);
        this.size = n - blocked.size;
        this.mapping = new Map();
        let free = this.size; // scans [size, n) for values that are not excluded
        for (const value of blocked) {
            if (value < this.size) {
                while (blocked.has(free)) {
                    free++;
                }
                this.mapping.set(value, free);
                free++;
            }
        }
    }

    pick(): number {
        const draw = Math.floor(Math.random() * this.size);
        return this.mapping.get(draw) ?? draw;
    }
}
