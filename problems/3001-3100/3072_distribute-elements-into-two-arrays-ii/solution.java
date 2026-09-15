import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] resultArray(int[] nums) {
        // Compress distinct values to 1-based ranks for the two Fenwick trees.
        int[] sorted = nums.clone();
        java.util.Arrays.sort(sorted);
        List<Integer> vals = new ArrayList<>();
        for (int i = 0; i < sorted.length; i++) {
            if (i == 0 || sorted[i] != sorted[i - 1]) {
                vals.add(sorted[i]);
            }
        }
        Map<Integer, Integer> comp = new HashMap<>();
        for (int i = 0; i < vals.size(); i++) {
            comp.put(vals.get(i), i + 1);
        }
        int size = vals.size();
        int[] tree1 = new int[size + 1];
        int[] tree2 = new int[size + 1];

        List<Integer> arr1 = new ArrayList<>();
        List<Integer> arr2 = new ArrayList<>();
        // Seed both arrays and their trees with the first two elements.
        arr1.add(nums[0]);
        arr2.add(nums[1]);
        add(tree1, comp.get(nums[0]), 1);
        add(tree2, comp.get(nums[1]), 1);

        for (int i = 2; i < nums.length; i++) {
            int x = nums[i];
            // greaterCount = size - prefix count of ranks <= rank(x).
            int c1 = arr1.size() - query(tree1, comp.get(x));
            int c2 = arr2.size() - query(tree2, comp.get(x));
            if (c1 > c2) {
                arr1.add(x);
                add(tree1, comp.get(x), 1);
            } else if (c1 < c2) {
                arr2.add(x);
                add(tree2, comp.get(x), 1);
            } else {
                // Equal counts: shorter array wins; ties on length go to arr1.
                if (arr1.size() <= arr2.size()) {
                    arr1.add(x);
                    add(tree1, comp.get(x), 1);
                } else {
                    arr2.add(x);
                    add(tree2, comp.get(x), 1);
                }
            }
        }
        int[] ans = new int[nums.length];
        int p = 0;
        for (int v : arr1) {
            ans[p++] = v;
        }
        for (int v : arr2) {
            ans[p++] = v;
        }
        return ans;
    }

    private void add(int[] tree, int i, int delta) {
        while (i < tree.length) {
            tree[i] += delta;
            i += i & -i;
        }
    }

    private int query(int[] tree, int i) {
        int s = 0;
        while (i > 0) {
            s += tree[i];
            i -= i & -i;
        }
        return s;
    }
}
