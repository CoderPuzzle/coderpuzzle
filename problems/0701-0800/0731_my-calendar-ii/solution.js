// Two interval lists. `singles` holds every accepted booking; `doubles`
// holds the regions where two accepted bookings already overlap. A new
// event is scanned against `doubles` first -- meeting any of them would
// park a third event on the same moment, so it is refused and nothing is
// recorded. Otherwise each accepted event it overlaps contributes the
// intersection to `doubles`, and the event itself joins `singles`.
class MyCalendarTwo {
    constructor() {
        this.singles = [];
        this.doubles = [];
    }

    book(start, end) {
        for (const [lo, hi] of this.doubles) {
            if (start < hi && lo < end) {
                return false;
            }
        }
        for (const [lo, hi] of this.singles) {
            if (start < hi && lo < end) {
                this.doubles.push([Math.max(start, lo), Math.min(end, hi)]);
            }
        }
        this.singles.push([start, end]);
        return true;
    }
}
