module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog", {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "semantic-release-slack-bot",
      {
        "notifyOnSuccess": false,
        "notifyOnFail": false,
        "branchesConfig": [
          {
            "pattern": "main",
            "notifyOnSuccess": true,
            "notifyOnFail": true
          }
        ]
      }
    ],
    [
      "@codedependant/semantic-release-docker", {
        "dockerTags": ["{version}", "{git_sha}"],
        "dockerFile": "src/api/Dockerfile",
        "dockerRegistry": process.env.CONTAINER_REGISTRY,
        "dockerImage": process.env.CONTAINER_REPOSITORY,
        "dockerLogin": false,
      }
    ],
    '@semantic-release/github', {
      "assets": ["CHANGELOG.md"]
    },
  ]
}
