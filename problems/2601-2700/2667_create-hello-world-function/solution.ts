// The factory keeps no state at all: it hands back a function that
// ignores every argument it receives and answers the same constant, so
// replays of any argument shapes land on the identical string.
function createHelloWorld(...args: unknown[]): () => string {
    void args;
    return () => "Hello World";
}

class Solution {
    run(helloWorldCase: HelloWorldCase): void {
        helloWorldCase.drive(createHelloWorld);
    }
}
