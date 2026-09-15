import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int calPoints(String[] operations) {
        // Every operation only ever touches the end of the record: a literal
        // pushes, the double and the sum read the last entry (or the last two)
        // and push, the cancel pops. Replaying the operations left to right on
        // a stack is therefore the whole computation, and the answer is the
        // sum of what is left — 0 when the record ends empty.
        Deque<Integer> record = new ArrayDeque<>();
        for (String op : operations) {
            if (op.equals("+")) {
                int top = record.pop();
                int sum = top + record.peek();
                record.push(top);
                record.push(sum);
            } else if (op.equals("D")) {
                record.push(2 * record.peek());
            } else if (op.equals("C")) {
                record.pop();
            } else {
                record.push(Integer.parseInt(op));
            }
        }
        int total = 0;
        for (int score : record) {
            total += score;
        }
        return total;
    }
}
