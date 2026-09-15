import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String decodeString(String s) {
        // One (previous_string, repeat_count) frame per unclosed '[' —
        // the stack mirrors the bracket structure, so context is never
        // lost no matter how deep the nesting goes.
        Deque<String> prevStack = new ArrayDeque<>();
        Deque<Integer> timesStack = new ArrayDeque<>();
        StringBuilder current = new StringBuilder();
        int repeat = 0;
        for (int idx = 0; idx < s.length(); idx++) {
            char ch = s.charAt(idx);
            if (ch >= '0' && ch <= '9') {
                // Multi-digit counts assemble digit by digit.
                repeat = repeat * 10 + (ch - '0');
            } else if (ch == '[') {
                // Park the outer segment and its count; reset both for
                // the fresh inner segment.
                prevStack.push(current.toString());
                timesStack.push(repeat);
                current = new StringBuilder();
                repeat = 0;
            } else if (ch == ']') {
                // Absorb the finished inner segment: restore the outer
                // string, then repeat-and-append onto it.
                String previous = prevStack.pop();
                int times = timesStack.pop();
                StringBuilder sb = new StringBuilder(previous);
                for (int t = 0; t < times; t++) {
                    sb.append(current);
                }
                current = sb;
            } else {
                current.append(ch);
            }
        }
        // Every bracket is closed, so the stack is empty and current is
        // the fully decoded string.
        return current.toString();
    }
}
