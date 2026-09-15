import java.util.*;

class Solution {

    public int minAbsoluteDifference(int[] nums, int x) {
        // A pair consists of two distinct indices, so x == 0 still demands a
        // separation of at least one index step.
        int separation = Math.max(x, 1);
        int[] vals = nums.clone();
        Arrays.sort(vals);
        int m = 0;
        for (int v : vals) {
            if (m == 0 || vals[m - 1] != v) {
                vals[m++] = v;
            }
        }
        Map<Integer, Integer> rank = new HashMap<>();
        for (int i = 0; i < m; i++) {
            rank.put(vals[i], i + 1);
        }
        int[] tree = new int[m + 1];
        int top = 1;
        while (top * 2 <= m) {
            top *= 2;
        }
        int answer = -1;
        for (int j = 0; j < nums.length; j++) {
            if (j >= separation) {
                // Partner nums[j - separation] enters the eligible prefix
                // before nums[j] queries it.
                for (int i = rank.get(nums[j - separation]); i <= m; i += i & -i) {
                    tree[i] += 1;
                }
                int value = nums[j];
                int count = 0;
                for (int i = rank.get(value); i > 0; i -= i & -i) {
                    count += tree[i];
                }
                int have = j - separation + 1;
                if (count > 0) {
                    int pos = 0;
                    int rem = count;
                    for (int step = top; step > 0; step >>= 1) {
                        int nxt = pos + step;
                        if (nxt <= m && tree[nxt] < rem) {
                            pos = nxt;
                            rem -= tree[nxt];
                        }
                    }
                    int difference = value - vals[pos];
                    if (answer < 0 || difference < answer) {
                        answer = difference;
                    }
                }
                if (have > count) {
                    int pos = 0;
                    int rem = count + 1;
                    for (int step = top; step > 0; step >>= 1) {
                        int nxt = pos + step;
                        if (nxt <= m && tree[nxt] < rem) {
                            pos = nxt;
                            rem -= tree[nxt];
                        }
                    }
                    int difference = vals[pos] - value;
                    if (answer < 0 || difference < answer) {
                        answer = difference;
                    }
                }
            }
        }
        return answer;
    }
}
