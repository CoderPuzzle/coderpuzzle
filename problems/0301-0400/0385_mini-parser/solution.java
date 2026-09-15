import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public NestedInteger deserialize(String s) {
        if (s.charAt(0) != '[') {
            NestedInteger leaf = new NestedInteger();
            leaf.setInteger(Integer.parseInt(s));
            return leaf;
        }
        Deque<NestedInteger> stack = new ArrayDeque<>();
        stack.push(new NestedInteger());
        NestedInteger root = null;
        int index = 1;
        while (index < s.length()) {
            char ch = s.charAt(index);
            if (ch == '[') {
                stack.push(new NestedInteger());
                ++index;
            } else if (ch == ']') {
                NestedInteger node = stack.pop();
                if (stack.isEmpty()) root = node;
                else stack.peek().add(node);
                ++index;
            } else if (ch == ',') {
                ++index;
            } else {
                int start = index;
                while (s.charAt(index) != ',' && s.charAt(index) != ']') ++index;
                NestedInteger leaf = new NestedInteger();
                leaf.setInteger(Integer.parseInt(s.substring(start, index)));
                stack.peek().add(leaf);
            }
        }
        return root;
    }
}
