"""The problem set is a directory on disk and nothing else.

Remote problem sets (GitHub shorthand, git URLs, the problems-fetcher
service and its cache) were removed: CODERPUZZLE_PROBLEMS is a path, unset
means ./problems, and anything that is not a directory is a startup error
rather than something the app tries to go and fetch.
"""
import importlib
import os
import tempfile
import unittest
from pathlib import Path
from unittest import mock


def _reload_with(value: str | None):
    environment = dict(os.environ)
    environment.pop("CODERPUZZLE_PROBLEMS", None)
    if value is not None:
        environment["CODERPUZZLE_PROBLEMS"] = value
    with mock.patch.dict(os.environ, environment, clear=True):
        from api.app import problems
        return importlib.reload(problems)


class ProblemSetPathTests(unittest.TestCase):
    def tearDown(self):
        # Leave the module as the rest of the suite expects to find it.
        _reload_with(None)

    def test_a_directory_path_is_the_package_root(self):
        with tempfile.TemporaryDirectory() as temporary:
            module = _reload_with(temporary)
            self.assertEqual(module.PROBLEMS_DIR, Path(temporary).resolve())

    def test_unset_defaults_to_the_repo_tree(self):
        module = _reload_with(None)
        self.assertEqual(module.PROBLEMS_DIR.name, "problems")
        self.assertTrue(module.PROBLEMS_DIR.is_dir())

    def test_a_github_shorthand_is_not_a_problem_set(self):
        """The old `owner/name` spec must fail loudly, not silently fetch."""
        with self.assertRaises(ValueError) as caught:
            _reload_with("CoderPuzzle/lc-adapt")
        self.assertIn("not a directory", str(caught.exception))

    def test_a_git_url_is_not_a_problem_set(self):
        for spec in ("https://github.com/CoderPuzzle/lc-adapt.git",
                     "git@github.com:CoderPuzzle/lc-adapt.git"):
            with self.subTest(spec=spec):
                with self.assertRaises(ValueError):
                    _reload_with(spec)

    def test_a_missing_directory_is_a_startup_error(self):
        with tempfile.TemporaryDirectory() as temporary:
            with self.assertRaises(ValueError):
                _reload_with(str(Path(temporary) / "absent"))

    def test_the_fetcher_and_its_spec_parser_are_gone(self):
        for module in ("api.app.problem_source", "api.app.fetch_problems"):
            with self.subTest(module=module):
                with self.assertRaises(ModuleNotFoundError):
                    importlib.import_module(module)


if __name__ == "__main__":
    unittest.main()
