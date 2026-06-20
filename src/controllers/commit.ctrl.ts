import axios from "axios";
import { Request, Response } from "express";

export const viewCommitCtrl = async (req: Request, res: Response) => {
  try {
    const { owner, repo, sha } = req.params;
    //env
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const result = {
      commit: {
        sha: data.sha,
        message: data.commit.message,
        author: {
          name: data.commit.author.name,
          avatar: data.author?.avatar_url,
          date: data.commit.author.date,
        },
        committer: {
          name: data.commit.committer.name,
          date: data.commit.committer.date,
        },
        parentSha: data.parents?.[0]?.sha,
        stats: data.stats,
      },
      files: data.files.map((file: any) => ({
        filename: file.filename,
        patch: file.patch || "",
      })),
    };

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
