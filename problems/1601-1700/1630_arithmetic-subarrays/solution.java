import java.util.Arrays;

class Solution {

    public boolean[] checkArithmeticSubarrays(int[] nums, int[] l, int[] r) {
        boolean[] answer = new boolean[l.length];
        for (int qi = 0; qi < l.length; qi++) {
            // A set of numbers can be rearranged into an arithmetic
            // sequence exactly when its sorted order already is one.
            int[] sub = Arrays.copyOfRange(nums, l[qi], r[qi] + 1);
            Arrays.sort(sub);
            int diff = sub[1] - sub[0];
            boolean ok = true;
            for (int i = 2; i < sub.length; i++) {
                if (sub[i] - sub[i - 1] != diff) {
                    ok = false;
                    break;
                }
            }
            answer[qi] = ok;
        }
        return answer;
    }
}
