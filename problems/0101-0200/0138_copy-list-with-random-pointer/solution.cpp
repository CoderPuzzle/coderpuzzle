class Solution {
  public:
    RandomListNode *copyRandomList(RandomListNode *head) {
        if (head == nullptr)
            return nullptr;
        std::unordered_map<RandomListNode *, RandomListNode *> copies;
        for (RandomListNode *node = head; node != nullptr; node = node->next) {
            copies[node] = new RandomListNode(node->val);
        }
        for (RandomListNode *node = head; node != nullptr; node = node->next) {
            if (node->next != nullptr)
                copies[node]->next = copies[node->next];
            if (node->random != nullptr)
                copies[node]->random = copies[node->random];
        }
        return copies[head];
    }
};
