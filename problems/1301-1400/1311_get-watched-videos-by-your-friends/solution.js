/**
 * @param {string[][]} watchedVideos
 * @param {number[][]} friends
 * @param {number} id
 * @param {number} level
 * @return {string[]}
 */
var watchedVideosByFriends = function (watchedVideos, friends, id, level) {
    // BFS discovers nodes in increasing distance order, so the nodes whose
    // recorded distance equals `level` are exactly the level-k people.
    const n = friends.length;
    const dist = new Array(n).fill(-1);
    dist[id] = 0;
    const queue = [id];
    const counts = new Map();
    for (let head = 0; head < queue.length; ++head) {
        const cur = queue[head];
        if (dist[cur] === level) {
            for (const video of watchedVideos[cur]) {
                counts.set(video, (counts.get(video) || 0) + 1);
            }
            continue;
        }
        for (const nxt of friends[cur]) {
            if (dist[nxt] === -1) {
                dist[nxt] = dist[cur] + 1;
                queue.push(nxt);
            }
        }
    }
    return [...counts.entries()]
        .sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
        .map((entry) => entry[0]);
};
