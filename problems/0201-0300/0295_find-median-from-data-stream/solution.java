import java.util.PriorityQueue;

class MedianFinder {

    // Two heaps around the median: a max-heap holding the smaller half and a
    // min-heap holding the larger half. The sizes differ by at most one.
    private final PriorityQueue<Integer> low = new PriorityQueue<>((a, b) -> b - a);
    private final PriorityQueue<Integer> high = new PriorityQueue<>();

    public MedianFinder() {}

    public void addNum(int num) {
        low.offer(num);
        // Route through both heaps: the largest of the small half crosses
        // over, then rebalance if the large half grew too big.
        high.offer(low.poll());
        if (high.size() > low.size()) {
            low.offer(high.poll());
        }
    }

    public double findMedian() {
        if (low.size() > high.size()) {
            return low.peek();
        }
        return (low.peek() + high.peek()) / 2.0;
    }
}
