# sed addresses line ten directly: print it, then quit so the rest of
# the file is never read.
sed -n '10{p;q;}'
