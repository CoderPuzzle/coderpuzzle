import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    private int[] xs;
    private int[] ys;

    public int[] beautifulPair(int[] nums1, int[] nums2) {
        int n = nums1.length;
        // Identical points sit at distance 0, the instant global minimum,
        // so a duplicate is answered directly from earliest occurrences.
        Map<Long, Integer> firstSeen = new HashMap<>();
        long bestJ = n,
            bestK = n;
        for (int i = 0; i < n; i++) {
            long key = (long) nums1[i] * 100001 + nums2[i];
            Integer j = firstSeen.get(key);
            if (j == null) {
                firstSeen.put(key, i);
            } else if ((long) j * n + i < bestJ * n + bestK) {
                bestJ = j;
                bestK = i;
            }
        }
        if (bestJ < n) {
            return new int[] { (int) bestJ, (int) bestK };
        }

        // Closest pair under Manhattan distance via divide and conquer:
        // the conquer scan walks each strip point forward while the y-gap
        // is under the running bound, so every shorter cross pair is seen.
        this.xs = nums1;
        this.ys = nums2;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) {
            idx[i] = i;
        }
        Arrays.sort(idx, (p, q) -> xs[p] != xs[q] ? Integer.compare(xs[p], xs[q]) : Integer.compare(ys[p], ys[q]));
        int[] order = new int[n];
        for (int i = 0; i < n; i++) {
            order[i] = idx[i];
        }
        int dist = solve(order, new int[n], 0, n);

        // With minimum distance d the points are pairwise >= d apart, so a
        // d-sided hash grid holds a bounded handful of points per cell and
        // each distance-d edge surfaces exactly once from earlier indices.
        Map<Long, List<Integer>> cells = new HashMap<>();
        for (int i = 0; i < n; i++) {
            long cx = nums1[i] / dist,
                cy = nums2[i] / dist;
            for (long gx = cx - 1; gx <= cx + 1; gx++) {
                for (long gy = cy - 1; gy <= cy + 1; gy++) {
                    List<Integer> bucket = cells.get(gx * 200003 + gy);
                    if (bucket == null) {
                        continue;
                    }
                    for (int j : bucket) {
                        int gap = Math.abs(nums1[i] - nums1[j]) + Math.abs(nums2[i] - nums2[j]);
                        if (gap == dist && j < bestJ) {
                            bestJ = j;
                            bestK = i;
                        }
                    }
                }
            }
            cells.computeIfAbsent(cx * 200003 + cy, k -> new ArrayList<>()).add(i);
        }
        return new int[] { (int) bestJ, (int) bestK };
    }

    private int solve(int[] idx, int[] tmp, int left, int right) {
        if (right - left <= 3) {
            int delta = Integer.MAX_VALUE;
            for (int a = left; a < right; a++) {
                for (int b = a + 1; b < right; b++) {
                    delta = Math.min(delta, Math.abs(xs[idx[a]] - xs[idx[b]]) + Math.abs(ys[idx[a]] - ys[idx[b]]));
                }
            }
            bulkSortByY(idx, left, right);
            return delta;
        }
        int mid = left + (right - left) / 2;
        int middle = xs[idx[mid]];
        int delta = Math.min(solve(idx, tmp, left, mid), solve(idx, tmp, mid, right));
        int a = left,
            b = mid,
            w = left;
        while (a < mid && b < right) {
            tmp[w++] = ys[idx[a]] <= ys[idx[b]] ? idx[a++] : idx[b++];
        }
        while (a < mid) {
            tmp[w++] = idx[a++];
        }
        while (b < right) {
            tmp[w++] = idx[b++];
        }
        System.arraycopy(tmp, left, idx, left, right - left);
        int length = left;
        for (int pos = left; pos < right; pos++) {
            if (Math.abs(xs[idx[pos]] - middle) < delta) {
                tmp[length++] = idx[pos];
            }
        }
        for (int pos = left; pos < length; pos++) {
            for (int follow = pos + 1; follow < length && ys[tmp[follow]] - ys[tmp[pos]] < delta; follow++) {
                delta = Math.min(
                    delta,
                    Math.abs(xs[tmp[pos]] - xs[tmp[follow]]) + Math.abs(ys[tmp[pos]] - ys[tmp[follow]])
                );
            }
        }
        return delta;
    }

    private void bulkSortByY(int[] idx, int left, int right) {
        Integer[] boxed = new Integer[right - left];
        for (int i = left; i < right; i++) {
            boxed[i - left] = idx[i];
        }
        Arrays.sort(boxed, (p, q) -> Integer.compare(ys[p], ys[q]));
        for (int i = left; i < right; i++) {
            idx[i] = boxed[i - left];
        }
    }
}
