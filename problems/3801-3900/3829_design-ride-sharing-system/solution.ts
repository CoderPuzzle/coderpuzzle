// Two FIFO arrays plus a waiting set: riders and drivers queue in arrival
// order, matchDriverWithRider pairs the two fronts, and cancelRider only
// unmarks the rider — a later match lazily skips any front rider that is
// no longer waiting, so cancellation never shifts the queue. Head indices
// instead of shift() keep every pop O(1).
class RideSharingSystem {
    private riders: number[];
    private riderHead: number;
    private drivers: number[];
    private driverHead: number;
    private waiting: Set<number>;

    constructor() {
        this.riders = [];
        this.riderHead = 0;
        this.drivers = [];
        this.driverHead = 0;
        this.waiting = new Set();
    }

    addRider(riderId: number): void {
        this.riders.push(riderId);
        this.waiting.add(riderId);
    }

    addDriver(driverId: number): void {
        this.drivers.push(driverId);
    }

    matchDriverWithRider(): number[] {
        while (this.riderHead < this.riders.length && !this.waiting.has(this.riders[this.riderHead])) {
            this.riderHead++;
        }
        if (this.riderHead === this.riders.length || this.driverHead === this.drivers.length) {
            return [-1, -1];
        }
        const riderId: number = this.riders[this.riderHead++];
        this.waiting.delete(riderId);
        return [this.drivers[this.driverHead++], riderId];
    }

    cancelRider(riderId: number): void {
        this.waiting.delete(riderId);
    }
}
