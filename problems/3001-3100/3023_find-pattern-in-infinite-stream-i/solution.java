class Solution {

    public int findPattern(InfiniteStream stream, int[] pattern) {
        int length = pattern.length;
        // Circular buffer of the last `length` bits: newest bit overwrites
        // the oldest, and a full window is compared against the pattern.
        int[] window = new int[length];
        int head = 0;
        int read = 0;
        while (true) {
            window[head] = stream.next();
            head = (head + 1) % length;
            read++;
            if (read >= length) {
                boolean matches = true;
                for (int i = 0; i < length; i++) {
                    if (window[(head + i) % length] != pattern[i]) {
                        matches = false;
                        break;
                    }
                }
                if (matches) {
                    return read - length;
                }
            }
        }
    }
}
