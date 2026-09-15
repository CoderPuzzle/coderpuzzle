import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    public double minTime(int n, int k, int m, int[] time, double[] mul) {
        // Dijkstra over (people-at-base mask, stage, boat side). Every leg
        // has a positive duration, so the first pop of a state is optimal.
        // Base side: cross any subgroup of size <= k; the stage advances by
        // floor(cross) % m. Destination side: one of the people already
        // across rows back while anyone remains at the base.
        int full = (1 << n) - 1;
        // groups[mask] = subgroups of mask holding 1..k people.
        List<List<Integer>> groups = new ArrayList<>();
        for (int mask = 0; mask <= full; mask++) groups.add(new ArrayList<>());
        for (int mask = 0; mask <= full; mask++) {
            for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
                if (Integer.bitCount(sub) <= k) groups.get(mask).add(sub);
            }
        }
        // mx[s] = largest time among s's members: it sets the crossing time.
        int[] mx = new int[full + 1];
        for (int i = 0; i < n; i++) mx[1 << i] = time[i];
        for (int s = 1; s <= full; s++) {
            int low = s & -s;
            if (s != low) mx[s] = Math.max(mx[low], mx[s ^ low]);
        }
        // Heap entries {dist, mask, stage, side}; mask/stage/side are exact
        // in a double, and the comparator orders by dist alone.
        PriorityQueue<double[]> heap = new PriorityQueue<>((a, b) -> Double.compare(a[0], b[0]));
        heap.add(new double[] { 0.0, full, 0, 0 });
        Map<Long, Double> dist = new HashMap<>();
        Double ans = null;
        while (!heap.isEmpty()) {
            double[] top = heap.poll();
            double d = top[0];
            int mask = (int) top[1],
                j = (int) top[2],
                side = (int) top[3];
            long key = ((long) mask << 4) | (j << 1) | side;
            Double seen = dist.get(key);
            if (seen != null && seen < d) continue;
            if (side == 0) {
                for (int s : groups.get(mask)) {
                    double cross = mx[s] * mul[j];
                    double nd = d + cross;
                    int rest = mask ^ s;
                    if (rest == 0) {
                        // final crossing: nobody left behind, no return
                        if (ans == null || nd < ans) ans = nd;
                    } else {
                        int nj = (j + (int) Math.floor(cross)) % m;
                        long nkey = ((long) rest << 4) | (nj << 1) | 1;
                        if (nd < dist.getOrDefault(nkey, Double.MAX_VALUE)) {
                            dist.put(nkey, nd);
                            heap.add(new double[] { nd, rest, nj, 1 });
                        }
                    }
                }
            } else {
                for (int r = 0; r < n; r++) {
                    if (((mask >> r) & 1) == 1) continue;
                    double ret = time[r] * mul[j];
                    int nj = (j + (int) Math.floor(ret)) % m;
                    long nkey = ((long) (mask | (1 << r)) << 4) | (nj << 1);
                    double nd = d + ret;
                    if (nd < dist.getOrDefault(nkey, Double.MAX_VALUE)) {
                        dist.put(nkey, nd);
                        heap.add(new double[] { nd, mask | (1 << r), nj, 0 });
                    }
                }
            }
        }
        return ans == null ? -1.0 : ans;
    }
}
