// Distinct timestamps with their hit counts, oldest first; getHits drops
// everything at or before timestamp - 300 off the front and sums what
// survives — the window is (timestamp - 300, timestamp].
class HitCounter {
    constructor() {
        this.times = [];
        this.counts = [];
    }

    hit(timestamp) {
        if (this.times.length > 0 && this.times[this.times.length - 1] === timestamp) {
            // Several hits may arrive at the same second; bumping the
            // newest count keeps one entry per distinct timestamp.
            this.counts[this.counts.length - 1]++;
        } else {
            this.times.push(timestamp);
            this.counts.push(1);
        }
    }

    getHits(timestamp) {
        const cutoff = timestamp - 300;
        while (this.times.length > 0 && this.times[0] <= cutoff) {
            // The window is (timestamp - 300, timestamp]: a hit at
            // exactly the cutoff second is already gone.
            this.times.shift();
            this.counts.shift();
        }
        let total = 0;
        for (const count of this.counts) {
            total += count;
        }
        return total;
    }
}
