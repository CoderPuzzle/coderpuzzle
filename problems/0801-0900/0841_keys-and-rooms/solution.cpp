class Solution {
  public:
    bool canVisitAllRooms(vector<vector<int>> &rooms) {
        // Rooms are nodes and keys are one-way edges, so the rooms that can
        // ever be entered are exactly those reachable from room 0. An
        // explicit stack floods the key graph; the answer compares marked
        // rooms to n.
        vector<bool> seen(rooms.size(), false);
        seen[0] = true;
        vector<int> stack;
        stack.push_back(0);
        int visited = 1;
        while (!stack.empty()) {
            int room = stack.back();
            stack.pop_back();
            for (int key : rooms[room]) {
                if (seen[key]) {
                    continue;
                }
                seen[key] = true;
                ++visited;
                stack.push_back(key);
            }
        }
        return visited == (int)rooms.size();
    }
};
