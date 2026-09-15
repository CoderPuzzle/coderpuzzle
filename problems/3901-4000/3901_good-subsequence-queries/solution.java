import java.util.ArrayList;
import java.util.List;

class Solution {

    private int n;
    private int allXor;
    private int forbiddenDistinct;
    private int[] counts;
    private int[] coveredXor;
    private int[] histogram;
    private int[] forbidden;

    private void adjust(int prime, int index, int delta) {
        int count = counts[prime];
        if (count == n - 1) {
            int missing = allXor ^ coveredXor[prime];
            if (--forbidden[missing] == 0) --forbiddenDistinct;
        }
        if (count > 0) --histogram[count];
        counts[prime] += delta;
        coveredXor[prime] ^= index;
        count = counts[prime];
        if (count > 0) ++histogram[count];
        if (count == n - 1) {
            int missing = allXor ^ coveredXor[prime];
            if (forbidden[missing]++ == 0) ++forbiddenDistinct;
        }
    }

    public int countGoodSubseq(int[] nums, int p, int[][] queries) {
        final int limit = 50000;
        n = nums.length;
        int[] smallest = new int[limit + 1];
        for (int i = 0; i <= limit; ++i) smallest[i] = i;
        for (int value = 2; value * value <= limit; ++value) {
            if (smallest[value] == value) {
                for (int multiple = value * value; multiple <= limit; multiple += value) {
                    if (smallest[multiple] == multiple) smallest[multiple] = value;
                }
            }
        }

        counts = new int[limit + 1];
        coveredXor = new int[limit + 1];
        histogram = new int[n + 1];
        forbidden = new int[n];
        allXor = 0;
        for (int i = 0; i < n; ++i) allXor ^= i;

        int active = 0;
        for (int i = 0; i < n; ++i) {
            if (nums[i] % p == 0) {
                ++active;
                for (int prime : factors(nums[i] / p, smallest)) adjust(prime, i, 1);
            }
        }
        int answer = 0;
        for (int[] query : queries) {
            int index = query[0],
                value = query[1];
            if (nums[index] % p == 0) {
                for (int prime : factors(nums[index] / p, smallest)) adjust(prime, index, -1);
                --active;
            }
            nums[index] = value;
            if (value % p == 0) {
                ++active;
                for (int prime : factors(value / p, smallest)) adjust(prime, index, 1);
            }
            if (
                active > 0 &&
                ((active < n && histogram[active] == 0) || (active == n && histogram[n] == 0 && forbiddenDistinct < n))
            ) ++answer;
        }
        return answer;
    }

    private static List<Integer> factors(int value, int[] smallest) {
        List<Integer> result = new ArrayList<>();
        while (value > 1) {
            int prime = smallest[value];
            result.add(prime);
            while (value % prime == 0) value /= prime;
        }
        return result;
    }
}
