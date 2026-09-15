import java.util.ArrayList;
import java.util.List;

class Solution {

    public int findMinFibonacciNumbers(int k) {
        List<Long> fibs = new ArrayList<>();
        fibs.add(1L);
        fibs.add(1L);
        while (fibs.get(fibs.size() - 1) + fibs.get(fibs.size() - 2) <= k) {
            fibs.add(fibs.get(fibs.size() - 1) + fibs.get(fibs.size() - 2));
        }
        // Zeckendorf: greedily taking the largest F <= k never lands on two
        // consecutive Fibonacci numbers, so this builds the unique minimal
        // (non-consecutive) representation term by term
        int count = 0;
        long remaining = k;
        int index = fibs.size() - 1;
        while (remaining > 0) {
            while (fibs.get(index) > remaining) {
                index--;
            }
            remaining -= fibs.get(index);
            count++;
        }
        return count;
    }
}
