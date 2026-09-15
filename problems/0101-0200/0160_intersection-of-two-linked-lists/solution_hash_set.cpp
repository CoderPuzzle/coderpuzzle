class Solution {
  public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        // Addresses are the identity: equal values in the two prefixes are
        // different nodes and never collide in the set.
        unordered_set<ListNode *> in_a;
        for (ListNode *node = headA; node != nullptr; node = node->next)
            in_a.insert(node);
        for (ListNode *node = headB; node != nullptr; node = node->next)
            if (in_a.count(node))
                return node;
        return nullptr;
    }
};
