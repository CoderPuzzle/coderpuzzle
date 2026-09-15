# Design a File Sharing System

## Description

We will use a file-sharing system to share a very large file which
consists of `m` small chunks with IDs from `1` to `m`.

When users join the system, the system should assign a unique ID to them.
The unique ID should be used once for each user, but when a user leaves
the system, the ID can be reused again.

Users can request a certain chunk of the file; the system should return a
list of IDs of all the users who own this chunk. If the user receives a
non-empty list of IDs, they receive the requested chunk successfully.

Implement the `FileSharing` class:

- `FileSharing(int m)` Initializes the object with a file of `m` chunks.
- `int join(int[] ownedChunks)` A new user joined the system owning some
  chunks of the file. The system should assign an id to the user which is
  the smallest positive integer not taken by any other user. Return the
  assigned id.
- `void leave(int userID)` The user with `userID` will leave the system;
  you cannot take file chunks from them anymore.
- `int[] request(int userID, int chunkID)` The user `userID` requested
  the file chunk with `chunkID`. Return a list of the IDs of all users
  that own this chunk sorted in ascending order.

### Example 1

```text
Input:
["FileSharing","join","join","join","request","request","leave","request","leave","join"]
[[4],[[1,2]],[[2,3]],[[4]],[1,3],[2,2],[1],[2,1],[2],[[]]]
Output: [null,1,2,3,[2],[1,2],null,[],null,1]
Explanation:
FileSharing fileSharing = new FileSharing(4); // A file of 4 chunks.
fileSharing.join([1, 2]);  // Chunks [1,2]; assign id = 1 and return 1.
fileSharing.join([2, 3]);  // Chunks [2,3]; assign id = 2 and return 2.
fileSharing.join([4]);     // Chunk [4]; assign id = 3 and return 3.
fileSharing.request(1, 3); // Only user 2 has chunk 3, return [2]. Note that
                           // after this request user 1 now has chunks [1,2,3].
fileSharing.request(2, 2); // Users [1,2] have chunk 2, return [1,2].
fileSharing.leave(1);      // User 1 left; their chunks are no longer available.
fileSharing.request(2, 1); // Nobody has chunk 1, return [].
fileSharing.leave(2);      // User 2 left.
fileSharing.join([]);      // No chunks; ids 1 and 2 are free, so id = 1 is
                           // reused and returned.
```

When a `request` returns a non-empty list, the requesting user receives
the chunk: the requested chunk is added to their owned chunks (this is
visible to later calls).

### Constraints

- `1 <= m <= 10⁵`
- `0 <= ownedChunks.length <= min(100, m)`
- `1 <= ownedChunks[i] <= m`
- Values of `ownedChunks` are unique.
- `1 <= chunkID <= m`
- `userID` is guaranteed to be a user in the system if you assign the IDs
  correctly.
- At most `10⁴` calls will be made to `join`, `leave`, and `request`.
- Each call to `leave` has a matching earlier call to `join`.

## Hints

### Hint 1

Keep, for each file chunk, the users who have this chunk.

### Hint 2

Alternatively keep all users with their owned chunks, and when a chunk is
requested check every user for it.
