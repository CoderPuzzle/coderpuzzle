import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] killProcess(int[] pid, int[] ppid, int kill) {
        // Killing a process kills its whole subtree, so group the processes
        // by parent — children of one parent keep pid-array order — and walk
        // down from kill. The queue doubles as the answer: every process
        // enters it in exactly the required breadth-first order, so each
        // dequeue is one more confirmed kill.
        Map<Integer, List<Integer>> children = new HashMap<>();
        for (int i = 0; i < pid.length; ++i) {
            children.computeIfAbsent(ppid[i], parent -> new ArrayList<>()).add(pid[i]);
        }
        List<Integer> killed = new ArrayList<>();
        killed.add(kill);
        for (int head = 0; head < killed.size(); ++head) {
            List<Integer> kids = children.get(killed.get(head));
            if (kids != null) {
                killed.addAll(kids);
            }
        }
        int[] answer = new int[killed.size()];
        for (int i = 0; i < answer.length; ++i) {
            answer[i] = killed.get(i);
        }
        return answer;
    }
}
