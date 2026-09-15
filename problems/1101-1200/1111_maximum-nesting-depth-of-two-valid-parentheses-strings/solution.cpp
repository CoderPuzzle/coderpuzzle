class Solution {
  public:
    vector<int> maxDepthAfterSplit(string seq) {
        vector<int> answer(seq.size());
        vector<int> stack; // group id of each still-open parenthesis
        int depth[2] = {0, 0};
        int last = 0;
        for (int i = 0; i < (int)seq.size(); ++i) {
            if (seq[i] == '(') {
                // Open in the shallower group; on a tie reuse the group the
                // previous '(' joined, so the depth gap never exceeds one.
                int group;
                if (depth[0] < depth[1])
                    group = 0;
                else if (depth[1] < depth[0])
                    group = 1;
                else
                    group = last;
                answer[i] = group;
                stack.push_back(group);
                depth[group]++;
                last = group;
            } else {
                // A ')' must close the matching '(' in the same group.
                int group = stack.back();
                stack.pop_back();
                depth[group]--;
                answer[i] = group;
            }
        }
        return answer;
    }
};
