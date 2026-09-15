import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class AuthenticationManager {

    // A FIFO queue of (tokenId, expiry) events plus a map of each token's
    // current expiry. Call times strictly increase and an expiry is always
    // currentTime + timeToLive, so every generate — and every fulfilled
    // renew — appends the largest expiry seen so far to the tail;
    // expiries grow along the queue. countUnexpiredTokens retires the
    // front while it is stale (a renew superseded it) or expired, and then
    // the map's size is the live count: nothing behind an unexpired front
    // can be expired.
    private final int timeToLive;
    private final Map<String, Integer> expiries = new HashMap<>();
    private final Deque<Token> queue = new ArrayDeque<>();

    public AuthenticationManager(int timeToLive) {
        this.timeToLive = timeToLive;
    }

    public void generate(String tokenId, int currentTime) {
        int expiry = currentTime + timeToLive;
        expiries.put(tokenId, expiry);
        queue.addLast(new Token(tokenId, expiry));
    }

    public void renew(String tokenId, int currentTime) {
        Integer expiry = expiries.get(tokenId);
        if (expiry == null || expiry <= currentTime) {
            return;
        }
        int renewed = currentTime + timeToLive;
        expiries.put(tokenId, renewed);
        queue.addLast(new Token(tokenId, renewed));
    }

    public int countUnexpiredTokens(int currentTime) {
        while (!queue.isEmpty()) {
            Token front = queue.peekFirst();
            Integer live = expiries.get(front.tokenId);
            if (live != null && live == front.expiry) {
                if (front.expiry > currentTime) {
                    break;
                }
                expiries.remove(front.tokenId);
            }
            queue.pollFirst();
        }
        return expiries.size();
    }

    private static final class Token {

        final String tokenId;
        final int expiry;

        Token(String tokenId, int expiry) {
            this.tokenId = tokenId;
            this.expiry = expiry;
        }
    }
}
