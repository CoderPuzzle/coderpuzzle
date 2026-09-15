class Allocator {
  public:
    Allocator(int n);
    int allocate(int size, int mID);
    int freeMemory(int mID);
};
