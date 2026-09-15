#include <string>
#include <vector>

class Solution {
  public:
    vector<string> removeComments(vector<string> &source) {
        // Each comment is decided by reading order — line by line, left to
        // right, first marker wins — so one pass with a single flag (inside
        // a block comment) and one buffer for the line under construction is
        // the whole computation. Entering or leaving a comment skips two
        // characters, so the closer of "/*/" never overlaps its opener. The
        // buffer flushes only when a line ends outside a block: an emptied
        // line is dropped, code before an opener joins code after its closer.
        vector<string> result;
        string buffer;
        bool inBlock = false;
        for (const string &line : source) {
            size_t i = 0;
            while (i < line.size()) {
                if (inBlock) {
                    if (i + 1 < line.size() && line[i] == '*' && line[i + 1] == '/') {
                        inBlock = false;
                        i += 2;
                    } else {
                        ++i;
                    }
                } else if (i + 1 < line.size() && line[i] == '/' && line[i + 1] == '/') {
                    break;
                } else if (i + 1 < line.size() && line[i] == '/' && line[i + 1] == '*') {
                    inBlock = true;
                    i += 2;
                } else {
                    buffer.push_back(line[i]);
                    ++i;
                }
            }
            if (!inBlock) {
                if (!buffer.empty()) {
                    result.push_back(buffer);
                }
                buffer.clear();
            }
        }
        return result;
    }
};
