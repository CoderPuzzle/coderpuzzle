struct RandomListNode {
  int val;
  RandomListNode *next;
  RandomListNode *random;
  RandomListNode() : val(0), next(nullptr), random(nullptr) {}
  explicit RandomListNode(int x) : val(x), next(nullptr), random(nullptr) {}
  RandomListNode(int x, RandomListNode *n, RandomListNode *r)
      : val(x), next(n), random(r) {}
};
