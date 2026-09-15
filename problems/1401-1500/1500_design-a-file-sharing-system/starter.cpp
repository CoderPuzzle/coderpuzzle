class FileSharing {
  public:
    FileSharing(int m);
    int join(vector<int> ownedChunks);
    void leave(int userID);
    vector<int> request(int userID, int chunkID);
};
