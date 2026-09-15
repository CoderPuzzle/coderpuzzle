import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] processQueries(int[] queries, int m) {
        List<Integer> p = new ArrayList<>();
        for (int value = 1; value <= m; value++) {
            p.add(value);
        }
        int[] result = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int q = queries[i];
            int pos = p.indexOf(q);
            result[i] = pos;
            p.remove(pos);
            p.add(0, q);
        }
        return result;
    }
}
