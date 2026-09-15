import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean isValid(String code) {
        // One left-to-right scan with a stack of open tag names. The
        // outermost tag is special: it must open at position 0 and its end
        // tag must be the last thing in the string, so any content seen
        // while the stack is empty is an immediate rejection.
        Deque<String> stack = new ArrayDeque<>();
        int n = code.length();
        int i = 0;
        while (i < n) {
            if (code.startsWith("<![CDATA[", i)) {
                // Cdata is legal only inside tag content, and its body runs
                // to the first "]]>" — everything between is opaque text.
                if (stack.isEmpty()) return false;
                int end = code.indexOf("]]>", i);
                if (end < 0) return false;
                i = end + 3;
            } else if (code.startsWith("</", i)) {
                // An end tag's name runs to the next ">"; it must equal the
                // most recently opened tag, or the nesting is unbalanced.
                if (stack.isEmpty()) return false;
                int j = code.indexOf('>', i);
                if (j < 0 || !code.substring(i + 2, j).equals(stack.pop())) return false;
                if (stack.isEmpty() && j != n - 1) return false;
                // The outer tag closed, yet content remains.
                i = j + 1;
            } else if (code.charAt(i) == '<') {
                // A start tag: parse the name to the next ">" and gate it
                // through the strict grammar before it enters the stack.
                int j = code.indexOf('>', i);
                if (j < 0 || !tagName(code.substring(i + 1, j))) return false;
                stack.push(code.substring(i + 1, j));
                i = j + 1;
            } else if (stack.isEmpty()) {
                return false; // plain text outside any tag
            } else {
                i++;
            }
        }
        return stack.isEmpty();
    }

    // 1-9 characters, upper-case letters only.
    private boolean tagName(String name) {
        if (name.length() < 1 || name.length() > 9) return false;
        for (int k = 0; k < name.length(); k++) {
            char ch = name.charAt(k);
            if (ch < 'A' || ch > 'Z') return false;
        }
        return true;
    }
}
