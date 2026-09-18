class MyCalendar {
    constructor() {
        // Accepted reservations as parallel sorted starts/ends arrays: a
        // new event can only conflict with the reservation before and
        // after its insertion point; binary search locates them in
        // O(log n).
        this.starts = [];
        this.ends = [];
    }

    book(start, end) {
        const starts = this.starts;
        // bisect_right: first index whose start exceeds `start`.
        let low = 0;
        let high = starts.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (starts[mid] <= start) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        const index = low - 1; // last reservation with start <= start
        // Half-open intervals: strict tests mean touching endpoints coexist.
        if (index >= 0 && this.ends[index] > start) {
            return false;
        }
        if (index + 1 < starts.length && starts[index + 1] < end) {
            return false;
        }
        // Insert exactly at the searched position — stays sorted, no re-sort.
        starts.splice(low, 0, start);
        this.ends.splice(low, 0, end);
        return true;
    }
}
