class Solution {
  public:
    vector<int> anagramMappings(vector<int> &nums1, vector<int> &nums2) {
        // Each element of nums1 must land on an index of nums2 that holds
        // the same value, and with repeats no index can serve two elements.
        // One pass files every value's indices in nums2 into a queue, left
        // to right; the second walk hands each element of nums1 the front
        // of its queue and pops it, so every copy takes the leftmost
        // position not claimed by an earlier copy.
        unordered_map<int, deque<int>> positions;
        for (int index = 0; index < (int)nums2.size(); ++index) {
            positions[nums2[index]].push_back(index);
        }
        vector<int> mapping;
        mapping.reserve(nums1.size());
        for (int value : nums1) {
            mapping.push_back(positions[value].front());
            positions[value].pop_front();
        }
        return mapping;
    }
};
