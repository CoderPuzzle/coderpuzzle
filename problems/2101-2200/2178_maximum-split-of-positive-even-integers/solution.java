import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<Long> maximumEvenSplit(long finalSum) {
        // An odd total can never be a sum of even numbers. Take the
        // smallest evens while the leftover allows a strictly larger final
        // part. finalSum reaches 10^10, so long carries it.
        List<Long> parts = new ArrayList<>();
        if (finalSum % 2 != 0) {
            return parts;
        }
        long take = 2;
        long remaining = finalSum;
        while (remaining - take > take) {
            parts.add(take);
            remaining -= take;
            take += 2;
        }
        parts.add(remaining);
        return parts;
    }
}
