class Solution {
  public:
    vector<int> findAllPeople(int n, vector<vector<int>> &meetings, int firstPerson) {
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        // Moment 0: person 0 hands the whisper to firstPerson, so the two
        // share a component while everybody else is still a singleton.
        parent[0] = firstPerson;
        sort(meetings.begin(), meetings.end(), [](const auto &left, const auto &right) { return left[2] < right[2]; });
        int start = 0;
        while (start < static_cast<int>(meetings.size())) {
            int end = start;
            while (end < static_cast<int>(meetings.size()) && meetings[end][2] == meetings[start][2]) {
                int ra = find(meetings[end][0]);
                int rb = find(meetings[end][1]);
                if (ra != rb) {
                    parent[ra] = rb;
                }
                ++end;
            }

            // Roll back every attendee this moment left uninformed: their
            // merges must not leak the whisper into a later moment.
            int root = find(0);
            for (int index = start; index < end; ++index) {
                int x = meetings[index][0];
                int y = meetings[index][1];
                if (find(x) != root)
                    parent[x] = x;
                if (find(y) != root)
                    parent[y] = y;
            }
            start = end;
        }

        int root = find(0);
        vector<int> answer;
        for (int person = 0; person < n; ++person) {
            if (find(person) == root)
                answer.push_back(person);
        }
        return answer;
    }
};
