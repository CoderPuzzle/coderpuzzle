import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public int minJumps(int[] nums) {
        // BFS over indices. When a prime-valued index p is first settled,
        // every index whose value is divisible by p joins the next BFS
        // layer, so the bucket of p is cleared after that single use — any
        // later prime-p index is strictly farther. Buckets are built
        // lazily by walking multiples of p up to max(nums) through a
        // value -> indices table.
        int n = nums.length;
        if (n == 1) {
            return 0;
        }
        int limit = 0;
        for (int v : nums) {
            limit = Math.max(limit, v);
        }
        boolean[] isPrime = new boolean[limit + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = false;
        if (limit >= 1) {
            isPrime[1] = false;
        }
        for (int f = 2; (long) f * f <= limit; ++f) {
            if (isPrime[f]) {
                for (int m = f * f; m <= limit; m += f) {
                    isPrime[m] = false;
                }
            }
        }
        Map<Integer, List<Integer>> byValue = new HashMap<>();
        for (int i = 0; i < n; ++i) {
            byValue.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
        }
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        dist[0] = 0;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.addLast(0);
        Set<Integer> used = new HashSet<>();
        while (!queue.isEmpty()) {
            int i = queue.pollFirst();
            int d = dist[i] + 1;
            if (i > 0 && dist[i - 1] == -1) {
                dist[i - 1] = d;
                queue.addLast(i - 1);
            }
            if (i + 1 < n && dist[i + 1] == -1) {
                dist[i + 1] = d;
                queue.addLast(i + 1);
            }
            int p = nums[i];
            if (p > 1 && isPrime[p] && !used.contains(p)) {
                List<Integer> bucket = new ArrayList<>();
                for (int m = p; m <= limit; m += p) {
                    List<Integer> list = byValue.get(m);
                    if (list != null) {
                        bucket.addAll(list);
                    }
                }
                used.add(p);
                for (int j : bucket) {
                    if (dist[j] == -1) {
                        dist[j] = d;
                        queue.addLast(j);
                    }
                }
            }
        }
        return dist[n - 1];
    }
}
