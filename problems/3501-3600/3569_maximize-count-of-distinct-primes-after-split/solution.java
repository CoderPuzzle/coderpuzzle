import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] maximumCount(int[] nums, int[][] queries) {
        // A prime counts on both sides of a split at k exactly when k lies
        // in [first + 1, last] of its occurrence indices, so every query
        // answer is (distinct primes present) + (deepest interval overlap).
        // Each prime value keeps a sorted list of its occurrence indices,
        // and an interval entering or leaving is two point updates in a
        // max-prefix segment tree over the split positions (+1 at first+1,
        // -1 at last+1): the root stores the largest prefix sum of the
        // event array, i.e. the best overlap, and the update work per query
        // is a constant number of interval insertions and removals.
        final int LIMIT = 100001;
        boolean[] isPrime = new boolean[LIMIT];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        for (int i = 2; (long) i * i < LIMIT; ++i) {
            if (isPrime[i]) {
                for (int j = i * i; j < LIMIT; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        int n = nums.length;
        int size = 1;
        while (size < n) {
            size <<= 1;
        }
        int[] segSum = new int[2 * size];
        int[] segBest = new int[2 * size];
        int[] cur = nums.clone();
        Map<Integer, List<Integer>> occ = new HashMap<>();
        int distinct = 0;
        for (int i = 0; i < n; ++i) {
            int v = cur[i];
            if (isPrime[v]) {
                distinct += occ.putIfAbsent(v, new ArrayList<>()) == null ? 1 : 0;
                occ.get(v).add(i);
            }
        }
        for (List<Integer> idxs : occ.values()) {
            if (idxs.size() >= 2) {
                events(idxs, 1, segSum, segBest, size);
            }
        }
        int[] answers = new int[queries.length];
        for (int t = 0; t < queries.length; ++t) {
            int idx = queries[t][0],
                val = queries[t][1];
            int old = cur[idx];
            if (old != val) {
                if (isPrime[old]) {
                    List<Integer> lst = occ.get(old);
                    if (lst.size() >= 2) {
                        events(lst, -1, segSum, segBest, size);
                    }
                    lst.remove((Integer) idx);
                    if (lst.isEmpty()) {
                        occ.remove(old);
                        --distinct;
                    } else if (lst.size() >= 2) {
                        events(lst, 1, segSum, segBest, size);
                    }
                }
                if (isPrime[val]) {
                    List<Integer> lst = occ.get(val);
                    if (lst != null && lst.size() >= 2) {
                        events(lst, -1, segSum, segBest, size);
                    }
                    if (lst == null) {
                        lst = new ArrayList<>();
                        occ.put(val, lst);
                        // idx is appended below in sorted position
                    }
                    int pos = lowerBound(lst, idx);
                    lst.add(pos, idx);
                    if (lst.size() >= 2) {
                        events(lst, 1, segSum, segBest, size);
                    } else {
                        ++distinct;
                    }
                }
                cur[idx] = val;
            }
            answers[t] = distinct + segBest[1];
        }
        return answers;
    }

    private void events(List<Integer> idxs, int sign, int[] segSum, int[] segBest, int size) {
        addEvent(idxs.get(0) + 1, sign, segSum, segBest, size);
        addEvent(idxs.get(idxs.size() - 1) + 1, -sign, segSum, segBest, size);
    }

    private void addEvent(int pos, int delta, int[] segSum, int[] segBest, int size) {
        int u = size + pos - 1;
        segSum[u] += delta;
        segBest[u] = segSum[u] > 0 ? segSum[u] : 0;
        for (u >>= 1; u > 0; u >>= 1) {
            int left = u + u;
            segSum[u] = segSum[left] + segSum[left + 1];
            int cross = segSum[left] + segBest[left + 1];
            segBest[u] = cross > segBest[left] ? cross : segBest[left];
        }
    }

    private int lowerBound(List<Integer> lst, int target) {
        int lo = 0,
            hi = lst.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (lst.get(mid) < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
