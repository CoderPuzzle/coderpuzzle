pub struct VideoSharingPlatform;

impl VideoSharingPlatform {
    pub fn new() -> Self {
        panic!("TODO")
    }

    pub fn upload(&mut self, video: String) -> i32 {
        panic!("TODO")
    }

    pub fn remove(&mut self, videoId: i32) {
        panic!("TODO")
    }

    pub fn watch(&mut self, videoId: i32, startMinute: i32, endMinute: i32) -> String {
        panic!("TODO")
    }

    pub fn like(&mut self, videoId: i32) {
        panic!("TODO")
    }

    pub fn dislike(&mut self, videoId: i32) {
        panic!("TODO")
    }

    pub fn getLikesAndDislikes(&mut self, videoId: i32) -> Vec<i32> {
        panic!("TODO")
    }

    pub fn getViews(&mut self, videoId: i32) -> i32 {
        panic!("TODO")
    }
}
