import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] recoverArray(int n, int[] sums) {
        int[] cur = sums.clone();
        Arrays.sort(cur);
        List<Integer> res = new ArrayList<>();
        while (cur.length > 1) {
            int diff = cur[cur.length - 1] - cur[cur.length - 2];
            Map<Integer, Integer> cnt = new HashMap<>();
            for (int x : cur) {
                cnt.merge(x, 1, Integer::sum);
            }
            List<Integer> left = new ArrayList<>(); // sums without the element
            List<Integer> right = new ArrayList<>(); // sums with the element
            for (int x : cur) {
                int c = cnt.getOrDefault(x, 0);
                if (c > 0) {
                    cnt.put(x, c - 1);
                    left.add(x);
                    cnt.merge(x + diff, -1, Integer::sum);
                    right.add(x + diff);
                }
            }
            boolean zeroInLeft = false;
            for (int x : left) {
                if (x == 0) {
                    zeroInLeft = true;
                    break;
                }
            }
            List<Integer> next = zeroInLeft ? left : right;
            res.add(zeroInLeft ? diff : -diff);
            int[] arr = new int[next.size()];
            for (int i = 0; i < next.size(); i++) {
                arr[i] = next.get(i);
            }
            cur = arr;
        }
        int[] out = new int[res.size()];
        for (int i = 0; i < res.size(); i++) {
            out[i] = res.get(i);
        }
        return out;
    }
}
