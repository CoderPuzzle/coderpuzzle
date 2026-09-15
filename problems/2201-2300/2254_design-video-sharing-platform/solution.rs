use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

struct Video {
    content: String,
    likes: i64,
    dislikes: i64,
    views: i64,
}

pub struct VideoSharingPlatform {
    videos: HashMap<i32, Video>,
    free_ids: BinaryHeap<Reverse<i32>>,
    next_id: i32,
}

impl VideoSharingPlatform {
    pub fn new() -> Self {
        VideoSharingPlatform {
            videos: HashMap::new(),
            free_ids: BinaryHeap::new(),
            next_id: 0,
        }
    }

    pub fn upload(&mut self, video: String) -> i32 {
        let video_id = match self.free_ids.pop() {
            Some(Reverse(id)) => id,
            None => {
                let id = self.next_id;
                self.next_id += 1;
                id
            }
        };
        self.videos.insert(
            video_id,
            Video {
                content: video,
                likes: 0,
                dislikes: 0,
                views: 0,
            },
        );
        video_id
    }

    pub fn remove(&mut self, videoId: i32) {
        if self.videos.remove(&videoId).is_some() {
            self.free_ids.push(Reverse(videoId));
        }
    }

    pub fn watch(&mut self, videoId: i32, startMinute: i32, endMinute: i32) -> String {
        match self.videos.get_mut(&videoId) {
            Some(video) => {
                video.views += 1;
                let end = (endMinute as usize).min(video.content.len() - 1);
                video.content[startMinute as usize..=end].to_string()
            }
            None => "-1".to_string(),
        }
    }

    pub fn like(&mut self, videoId: i32) {
        if let Some(video) = self.videos.get_mut(&videoId) {
            video.likes += 1;
        }
    }

    pub fn dislike(&mut self, videoId: i32) {
        if let Some(video) = self.videos.get_mut(&videoId) {
            video.dislikes += 1;
        }
    }

    pub fn getLikesAndDislikes(&mut self, videoId: i32) -> Vec<i32> {
        match self.videos.get(&videoId) {
            Some(video) => vec![video.likes as i32, video.dislikes as i32],
            None => vec![-1],
        }
    }

    pub fn getViews(&mut self, videoId: i32) -> i32 {
        match self.videos.get(&videoId) {
            Some(video) => video.views as i32,
            None => -1,
        }
    }
}
