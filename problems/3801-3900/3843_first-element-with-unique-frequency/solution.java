import java.util.HashMap;
import java.util.Map;

class Solution {

    public int firstUniqueFreq(int[] nums) {
        // Values, frequencies, and counts of frequencies are all at most
        // 10^5, so int arithmetic carries everything without overflow.
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : nums) {
            freq.merge(x, 1, Integer::sum);
        }
        // freqCount maps each frequency to how many distinct values share
        // it; a value's frequency is unique exactly when that count is 1.
        Map<Integer, Integer> freqCount = new HashMap<>();
        for (int f : freq.values()) {
            freqCount.merge(f, 1, Integer::sum);
        }
        // Scan in index order: the first element whose value has a unique
        // frequency wins, even if a "smaller" qualifying value appears later.
        for (int x : nums) {
            if (freqCount.get(freq.get(x)) == 1) {
                return x;
            }
        }
        return -1;
    }
}
