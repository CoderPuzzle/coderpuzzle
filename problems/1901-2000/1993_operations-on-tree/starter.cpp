class LockingTree {
  public:
    LockingTree(vector<int> parent);
    bool lock(int num, int user);
    bool unlock(int num, int user);
    bool upgrade(int num, int user);
};
