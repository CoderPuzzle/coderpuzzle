import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] maxDepthAfterSplit(String seq) {
        int[] answer = new int[seq.length()];
        Deque<Integer> stack = new ArrayDeque<>(); // group of each open '('
        int[] depth = new int[2];
        int last = 0;
        for (int i = 0; i < seq.length(); ++i) {
            if (seq.charAt(i) == '(') {
                // Open in the shallower group; on a tie reuse the group the
                // previous '(' joined, so the depth gap never exceeds one.
                int group;
                if (depth[0] < depth[1]) group = 0;
                else if (depth[1] < depth[0]) group = 1;
                else group = last;
                answer[i] = group;
                stack.push(group);
                depth[group]++;
                last = group;
            } else {
                // A ')' must close the matching '(' in the same group.
                int group = stack.pop();
                depth[group]--;
                answer[i] = group;
            }
        }
        return answer;
    }
}
