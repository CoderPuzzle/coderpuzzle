class Solution {
  public:
    bool canFormArray(vector<int> &arr, vector<vector<int>> &pieces) {
        // Every value across pieces is distinct, so a piece is uniquely
        // identified by its first element. Map that value to the piece,
        // then walk arr and match pieces to consecutive slices.
        unordered_map<int, vector<int> *> first;
        for (auto &piece : pieces)
            first[piece[0]] = &piece;

        size_t index = 0;
        while (index < arr.size()) {
            auto it = first.find(arr[index]);
            if (it == first.end())
                return false;
            vector<int> &piece = *it->second;
            if (index + piece.size() > arr.size())
                return false;
            for (size_t offset = 0; offset < piece.size(); ++offset) {
                if (arr[index + offset] != piece[offset])
                    return false;
            }
            index += piece.size();
        }
        return true;
    }
};
