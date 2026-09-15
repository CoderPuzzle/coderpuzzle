import java.util.*;

class Solution {

    public int[] numberOfPairs(int[] a, int[] b, int[][] qs) {
        int S = 225,
            B = (b.length + S - 1) / S;
        long[] v = new long[b.length],
            lazy = new long[B];
        for (int i = 0; i < b.length; i++) v[i] = b[i];
        List<Map<Long, Integer>> fs = new ArrayList<>();
        for (int z = 0; z < B; z++) fs.add(new HashMap<>());
        for (int z = 0; z < B; z++) rebuild(z, S, v, lazy, fs);
        Map<Integer, Integer> af = new HashMap<>();
        for (int x : a) af.merge(x, 1, Integer::sum);
        int count = 0;
        for (int[] q : qs) if (q[0] == 2) count++;
        int[] out = new int[count];
        count = 0;
        for (int[] q : qs)
            if (q[0] == 1) {
                int l = q[1],
                    r = q[2],
                    L = l / S,
                    R = r / S;
                if (L == R) {
                    rebuild(L, S, v, lazy, fs);
                    for (int i = l; i <= r; i++) v[i] += q[3];
                    rebuild(L, S, v, lazy, fs);
                } else {
                    rebuild(L, S, v, lazy, fs);
                    for (int i = l; i < (L + 1) * S; i++) v[i] += q[3];
                    rebuild(L, S, v, lazy, fs);
                    rebuild(R, S, v, lazy, fs);
                    for (int i = R * S; i <= r; i++) v[i] += q[3];
                    rebuild(R, S, v, lazy, fs);
                    for (int z = L + 1; z < R; z++) lazy[z] += q[3];
                }
            } else {
                int z = 0;
                for (var e : af.entrySet())
                    for (int j = 0; j < B; j++) z +=
                        e.getValue() * fs.get(j).getOrDefault((long) q[1] - e.getKey() - lazy[j], 0);
                out[count++] = z;
            }
        return out;
    }

    void rebuild(int z, int S, long[] v, long[] lazy, List<Map<Long, Integer>> fs) {
        int l = z * S,
            r = Math.min(v.length, l + S);
        if (lazy[z] != 0) {
            for (int i = l; i < r; i++) v[i] += lazy[z];
            lazy[z] = 0;
        }
        Map<Long, Integer> m = fs.get(z);
        m.clear();
        for (int i = l; i < r; i++) m.merge(v[i], 1, Integer::sum);
    }
}
