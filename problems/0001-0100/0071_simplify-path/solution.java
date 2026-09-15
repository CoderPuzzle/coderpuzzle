import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String simplifyPath(String path) {
        // Splitting on "/" turns repeated and edge slashes into empty segments
        // and hands each directory to the loop as one candidate, so only the
        // dot rules remain to apply.
        Deque<String> stack = new ArrayDeque<>();
        for (String segment : path.split("/", -1)) {
            if (segment.equals("..")) {
                // One level up: drop the last name pushed. An empty stack is
                // the root, where going up is not possible, so it stays empty.
                if (!stack.isEmpty()) {
                    stack.pollLast();
                }
            } else if (!segment.equals(".") && !segment.isEmpty()) {
                // "." is the current directory, "" a repeated or edge slash;
                // every other segment, "..." and "...." included, is a name.
                stack.addLast(segment);
            }
        }
        // A leading slash plus exactly one slash between the survivors.
        return "/" + String.join("/", stack);
    }
}
