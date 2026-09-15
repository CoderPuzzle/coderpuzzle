// A queue of ping times: ping(t) appends t, evicts everything older
// than the window's left edge t - 3000 off the front — a time below
// that edge is below every future edge too, since t only grows — and
// returns how many times remain.
class RecentCounter {
    constructor() {
        this.times = [];
    }

    ping(t) {
        this.times.push(t);
        while (this.times[0] < t - 3000) {
            // The left edge t - 3000 only moves right, so everything
            // evicted now is gone from every future window as well.
            this.times.shift();
        }
        return this.times.length;
    }
}
