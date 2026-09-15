class Solution {

    private final char[] buf4 = new char[4];
    private int buf4Count = 0;
    private int buf4Index = 0;

    public int read(File file, int[] queries, char[] buf) {
        int total = 0;
        for (int n : queries) {
            total += transfer(file, n, buf, total);
        }
        return total;
    }

    private int transfer(File file, int n, char[] buf, int offset) {
        int transferred = 0;
        while (transferred < n) {
            if (buf4Index == buf4Count) {
                buf4Count = file.read4(buf4);
                buf4Index = 0;
                if (buf4Count == 0) {
                    break;
                }
            }
            int take = Math.min(buf4Count - buf4Index, n - transferred);
            for (int index = 0; index < take; ++index) {
                buf[offset + transferred + index] = buf4[buf4Index + index];
            }
            buf4Index += take;
            transferred += take;
        }
        return transferred;
    }
}
