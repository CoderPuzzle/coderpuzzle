import java.util.PriorityQueue;

class SeatManager {

    // Min-heap holding ONLY currently returned seats — never the untouched ones.
    private final PriorityQueue<Integer> returned = new PriorityQueue<>();
    // Largest seat number ever reserved: fresh seats march upward from here.
    private int nextSeat = 1;

    public SeatManager(int n) {
        this.nextSeat = 1;
    }

    public int reserve() {
        // Prefer the smallest returned seat; the top is always < nextSeat, so the
        // two sources of free seats never overlap.
        if (!returned.isEmpty() && returned.peek() < nextSeat) {
            return returned.poll();
        }
        // No outstanding returns: the next fresh seat is simply nextSeat.
        return nextSeat++;
    }

    public void unreserve(int seatNumber) {
        // The monotone counter march is disrupted by exactly this one seat.
        returned.offer(seatNumber);
    }
}
