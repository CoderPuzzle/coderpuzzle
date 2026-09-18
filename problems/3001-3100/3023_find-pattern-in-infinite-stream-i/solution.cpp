class InfiniteStream;

class Solution {
  public:
    int findPattern(InfiniteStream &stream, vector<int> &pattern) {
        int length = static_cast<int>(pattern.size());
        // Circular buffer of the last `length` bits: the newest bit
        // overwrites the oldest, and a full window is compared with the
        // pattern.
        vector<int> window(length);
        int head = 0;
        long long read = 0;
        while (true) {
            window[head] = stream.next();
            head = (head + 1) % length;
            ++read;
            if (read >= length) {
                bool matches = true;
                for (int i = 0; i < length; ++i) {
                    if (window[(head + i) % length] != pattern[i]) {
                        matches = false;
                        break;
                    }
                }
                if (matches) {
                    return static_cast<int>(read - length);
                }
            }
        }
    }
};
