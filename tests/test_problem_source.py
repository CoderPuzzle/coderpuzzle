import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from api.app.problem_source import (
    LocalSource,
    ProblemSourceError,
    RemoteSource,
    parse_spec,
    resolve_spec,
)


def remote(spec: str) -> RemoteSource:
    source = parse_spec(spec)
    assert isinstance(source, RemoteSource), f"{spec!r} did not parse as remote"
    return source


def local(spec: str) -> LocalSource:
    source = parse_spec(spec)
    assert isinstance(source, LocalSource), f"{spec!r} did not parse as local"
    return source


class ParseSpecTests(unittest.TestCase):
    def test_bare_two_segments_always_mean_github(self):
        source = remote("CoderPuzzle/coderpuzzle-problems")
        self.assertEqual(source.url, "https://github.com/CoderPuzzle/coderpuzzle-problems.git")
        self.assertIsNone(source.ref)
        self.assertEqual(source.cache_key, "github__CoderPuzzle__coderpuzzle-problems")

    def test_shorthand_accepts_a_pinned_ref(self):
        source = remote("CoderPuzzle/coderpuzzle-problems@v1.2.0")
        self.assertEqual(source.ref, "v1.2.0")
        self.assertEqual(source.url, "https://github.com/CoderPuzzle/coderpuzzle-problems.git")

    def test_shorthand_accepts_slashed_refs(self):
        self.assertEqual(remote("a/b@release/v2").ref, "release/v2")

    def test_explicit_relative_path_is_local_even_with_two_segments(self):
        self.assertEqual(local("./name/repo").path, Path("./name/repo"))
        self.assertEqual(local("../name/repo").path, Path("../name/repo"))

    def test_absolute_home_and_file_urls_are_local(self):
        self.assertEqual(local("/srv/problems").path, Path("/srv/problems"))
        self.assertEqual(local("~/problems").path, Path("~/problems").expanduser())
        self.assertEqual(local("file:///srv/openoj-problems").path, Path("/srv/openoj-problems"))

    def test_https_url_with_and_without_fragment_ref(self):
        source = remote("https://github.com/myname/openoj-problems-curated")
        self.assertEqual(source.url, "https://github.com/myname/openoj-problems-curated")
        self.assertIsNone(source.ref)
        self.assertEqual(
            remote("https://example.com/a/set.git#v3").url,
            "https://example.com/a/set.git",
        )
        self.assertEqual(remote("https://example.com/a/set.git#v3").ref, "v3")

    def test_ssh_url_parses_owner_and_name(self):
        source = remote("git@github.com:CoderPuzzle/coderpuzzle-problems.git")
        self.assertEqual(source.url, "git@github.com:CoderPuzzle/coderpuzzle-problems.git")
        self.assertEqual(source.cache_key, "github__CoderPuzzle__coderpuzzle-problems")

    def test_rejects_single_and_three_segment_bare_specs(self):
        for bad in ("problems", "a/b/c", "", "   ", "-leading/hyphen", "a/b@bad..ref!"):
            with self.assertRaises(ProblemSourceError, msg=bad):
                parse_spec(bad)

    def test_error_message_lists_the_accepted_forms(self):
        with self.assertRaisesRegex(ProblemSourceError, "owner/name"):
            parse_spec("not-a-source")


class ResolveSpecTests(unittest.TestCase):
    def test_local_directory_is_used_in_place(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "problems").mkdir()
            (root / "problems" / "0001_two-sum.md").write_text("x", encoding="utf-8")
            self.assertEqual(resolve_spec(str(root)), root / "problems")

    def test_local_repository_without_problems_subdir_uses_root(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "0001_two-sum.md").write_text("x", encoding="utf-8")
            self.assertEqual(resolve_spec(str(root)), root)

    def test_missing_local_directory_is_rejected(self):
        with self.assertRaisesRegex(ProblemSourceError, "not a directory"):
            resolve_spec("/nonexistent/openoj-problems")

    def test_remote_requires_a_cache_directory(self):
        with self.assertRaisesRegex(ProblemSourceError, "cache"):
            resolve_spec("CoderPuzzle/coderpuzzle-problems")

    def test_remote_clones_then_updates_on_restart(self):
        from api.app import problem_source

        calls = []

        def fake_git(arguments):
            calls.append(list(arguments))
            if arguments[1] == "clone":
                cache_dir = Path(arguments[-1])
                (cache_dir / ".git").mkdir(parents=True, exist_ok=True)

        original_git = problem_source._git
        original_remote = problem_source._remote_commit
        original_recorded = problem_source._recorded_commit
        problem_source._git = fake_git
        problem_source._remote_commit = lambda source: "f" * 40  # remote reachable
        problem_source._recorded_commit = lambda target: None  # stale record
        try:
            with TemporaryDirectory() as directory:
                cache = Path(directory)
                resolve_spec("CoderPuzzle/coderpuzzle-problems@v2", cache)
                self.assertEqual(
                    calls[-1][:4],
                    ["git", "clone", "--depth", "1"],
                )
                # A warm cache converges to the remote instead of re-cloning
                calls.clear()
                resolve_spec("CoderPuzzle/coderpuzzle-problems@v2", cache)
                update = calls[0]
                self.assertEqual(update[:3], ["git", "-C", str(cache / "github__CoderPuzzle__coderpuzzle-problems")])
                self.assertEqual(update[3:6], ["fetch", "--depth", "1"])
                self.assertIn("v2", update)
                self.assertEqual(calls[1][3], "reset")
                self.assertEqual(calls[2][3:5], ["clean", "-fdq"])
                self.assertEqual(len(calls), 3)
                # An unchanged remote (recorded hash == ls-remote hash): no git runs at all
                calls.clear()
                problem_source._recorded_commit = lambda target: "f" * 40
                resolve_spec("CoderPuzzle/coderpuzzle-problems@v2", cache)
                self.assertEqual(calls, [])
                # An unreachable remote (offline start): the cached revision is kept as-is
                calls.clear()
                problem_source._remote_commit = lambda source: None
                resolve_spec("CoderPuzzle/coderpuzzle-problems@v2", cache)
                self.assertEqual(calls, [])
        finally:
            problem_source._git = original_git
            problem_source._remote_commit = original_remote
            problem_source._recorded_commit = original_recorded


    def test_readonly_resolution_needs_a_warm_cache_and_never_runs_git(self):
        from api.app import problem_source

        def unexpected_git(arguments):
            raise AssertionError(f"git must not run in the API container: {arguments}")

        original_git = problem_source._git
        problem_source._git = unexpected_git
        try:
            with TemporaryDirectory() as directory:
                cache = Path(directory)
                with self.assertRaisesRegex(ProblemSourceError, "problems-fetcher"):
                    resolve_spec("CoderPuzzle/coderpuzzle-problems", cache, update=False)
                warmed = cache / "github__CoderPuzzle__coderpuzzle-problems"
                (warmed / ".git").mkdir(parents=True)
                self.assertEqual(resolve_spec("CoderPuzzle/coderpuzzle-problems", cache, update=False), warmed)
        finally:
            problem_source._git = original_git


if __name__ == "__main__":
    unittest.main()
