class Twitter {
    constructor() {
        // Per-user chronological message lists (newest last) plus
        // follow sets.
        this.posts = new Map(); // user -> [[time, id], ...]
        this.following = new Map();
        this.clock = 0;
    }

    postTweet(userId, messageId) {
        let timeline = this.posts.get(userId);
        if (!timeline) {
            timeline = [];
            this.posts.set(userId, timeline);
        }
        timeline.push([this.clock, messageId]);
        this.clock++;
    }

    getNewsFeed(userId) {
        // Merge the last 10 messages of the user and every followee,
        // keeping only the 10 most recent by global timestamp: a
        // bounded min-heap, as a plain scan over at most 10 kept
        // entries.
        const sources = new Set([userId, ...(this.following.get(userId) || [])]);
        const kept = [];
        for (const source of sources) {
            const timeline = this.posts.get(source);
            if (!timeline) {
                continue;
            }
            for (let index = Math.max(0, timeline.length - 10); index < timeline.length; index++) {
                const entry = timeline[index];
                if (kept.length < 10) {
                    kept.push(entry);
                    continue;
                }
                // Evict the smallest kept entry when the candidate is newer.
                let oldest = 0;
                for (let other = 1; other < kept.length; other++) {
                    if (this.entryLess(kept[other], kept[oldest])) {
                        oldest = other;
                    }
                }
                if (this.entryLess(kept[oldest], entry)) {
                    kept[oldest] = entry;
                }
            }
        }
        // Newest first: sort descending by (time, id).
        kept.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        kept.reverse();
        return kept.map(([, id]) => id);
    }

    entryLess(a, b) {
        return a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1];
    }

    follow(followerId, followeeId) {
        let set = this.following.get(followerId);
        if (!set) {
            set = new Set();
            this.following.set(followerId, set);
        }
        set.add(followeeId);
    }

    unfollow(followerId, followeeId) {
        this.following.get(followerId)?.delete(followeeId);
    }
}
