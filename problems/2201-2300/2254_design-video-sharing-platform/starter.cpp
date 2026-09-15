class VideoSharingPlatform {
  public:
    VideoSharingPlatform();
    int upload(string video);
    void remove(int videoId);
    string watch(int videoId, int startMinute, int endMinute);
    void like(int videoId);
    void dislike(int videoId);
    vector<int> getLikesAndDislikes(int videoId);
    int getViews(int videoId);
};
