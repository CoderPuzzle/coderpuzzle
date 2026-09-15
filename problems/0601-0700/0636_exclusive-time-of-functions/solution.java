class Solution {

    public int[] exclusiveTime(int n, String[] logs) {
        int[] res = new int[n];
        int[] stack = new int[logs.length + 1]; // funcId
        int[] resume = new int[logs.length + 1]; // resume timestamp
        int top = 0;
        for (String log : logs) {
            int c1 = log.indexOf(':');
            int c2 = log.indexOf(':', c1 + 1);
            int fid = Integer.parseInt(log.substring(0, c1));
            boolean start = log.charAt(c1 + 1) == 's';
            int ts = Integer.parseInt(log.substring(c2 + 1));
            if (start) {
                if (top > 0) {
                    res[stack[top - 1]] += ts - resume[top - 1];
                }
                stack[top] = fid;
                resume[top] = ts;
                top++;
            } else {
                top--;
                res[stack[top]] += ts - resume[top] + 1;
                if (top > 0) {
                    resume[top - 1] = ts + 1;
                }
            }
        }
        return res;
    }
}
