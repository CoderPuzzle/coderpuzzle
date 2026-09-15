class Solution {

    public int minOperations(String[] logs) {
        // Track only the current depth: "../" backs up (never below the
        // main folder), "./" is a no-op, and any other entry descends
        // into a named child folder. The final depth is exactly the
        // number of "../" moves needed to return to the main folder.
        int depth = 0;
        for (String log : logs) {
            if (log.equals("../")) {
                depth = Math.max(depth - 1, 0);
            } else if (log.equals("./")) {
                continue;
            } else {
                depth++;
            }
        }
        return depth;
    }
}
