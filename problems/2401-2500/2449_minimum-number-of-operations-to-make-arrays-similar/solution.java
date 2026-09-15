import java.util.ArrayList;
import java.util.List;

class Solution {

    public long makeSimilar(int[] nums, int[] target) {
        // Every move is +-2, so an element's parity never changes and the
        // even/odd classes evolve independently in size. Within a class,
        // matching sorted positions smallest-to-smallest (hints 2-3) never
        // wastes work: any crossing assignment can be uncrossed without
        // raising the total rise. Each operation supplies exactly one +2,
        // so the answer is the total positive rise divided by 2 — the
        // drops are free riders on the same operations.
        List<Integer> evens = paritySorted(nums, 0);
        List<Integer> odds = paritySorted(nums, 1);
        List<Integer> tevens = paritySorted(target, 0);
        List<Integer> todds = paritySorted(target, 1);
        long ops = 0;
        for (int i = 0; i < evens.size(); i++) {
            int t = tevens.get(i);
            if (t > evens.get(i)) {
                ops += (t - evens.get(i)) / 2;
            }
        }
        for (int i = 0; i < odds.size(); i++) {
            int t = todds.get(i);
            if (t > odds.get(i)) {
                ops += (t - odds.get(i)) / 2;
            }
        }
        return ops;
    }

    private static List<Integer> paritySorted(int[] arr, int parity) {
        List<Integer> out = new ArrayList<>();
        for (int x : arr) {
            if (x % 2 == parity) {
                out.add(x);
            }
        }
        out.sort(Integer::compareTo);
        return out;
    }
}
