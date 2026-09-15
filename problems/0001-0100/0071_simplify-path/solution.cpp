class Solution {
  public:
    string simplifyPath(string path) {
        // Splitting on "/" turns repeated and edge slashes into empty segments
        // and hands each directory to the loop as one candidate, so only the
        // dot rules remain to apply.
        vector<string> stack;
        stringstream segments(path);
        string segment;
        while (getline(segments, segment, '/')) {
            if (segment == "..") {
                // One level up: drop the last name pushed. An empty stack is
                // the root, where going up is not possible, so it stays empty.
                if (!stack.empty())
                    stack.pop_back();
            } else if (segment != "." && !segment.empty()) {
                // "." is the current directory, "" a repeated or edge slash;
                // every other segment, "..." and "...." included, is a name.
                stack.push_back(segment);
            }
        }
        // A leading slash plus exactly one slash between the survivors.
        string result;
        for (const string &name : stack) {
            result += "/";
            result += name;
        }
        return result.empty() ? "/" : result;
    }
};
