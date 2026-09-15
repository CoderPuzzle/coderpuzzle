import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public double maxPrice(int[][] items, int capacity) {
        long totalWeight = 0;
        for (int[] item : items) totalWeight += item[1];
        // Divisibility makes this fractional knapsack: moving a unit of weight
        // from a cheaper to a dearer price-per-weight item never lowers the
        // total, so a greedy fill in unit-price order is optimal. If even all
        // items together weigh less than the bag, no packing can fill it.
        if (totalWeight < capacity) return -1.0;
        // Stable sort by price-per-weight ratio, descending.
        List<int[]> ordered = new ArrayList<>();
        for (int[] item : items) ordered.add(item);
        Collections.sort(ordered, (a, b) -> Double.compare((double) b[0] / b[1], (double) a[0] / a[1]));
        double price = 0.0;
        long remaining = capacity;
        for (int[] item : ordered) {
            if (remaining <= 0) break;
            int p = item[0],
                w = item[1];
            if (w <= remaining) {
                price += p;
                remaining -= w;
            } else {
                // First item heavier than what remains: take just the
                // fraction remaining/w of it — the only floating-point step.
                price += p * ((double) remaining / w);
                remaining = 0;
            }
        }
        return price;
    }
}
