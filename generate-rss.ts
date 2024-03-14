import { readFileSync, writeFileSync } from "fs";
import RSS from "rss";
import type { Post } from "./post";

const feed = new RSS({
  title: "Thoughtful Coding",
  description: "... on life and work.",
  site_url: "https://mharris.io",
  feed_url: "https://mharris.io/rss.xml",
  managingEditor: "Michael Harris",
  webMaster: "Michael Harris",
  language: "en",
});

(() => {
  const posts = JSON.parse(readFileSync("posts.json", "utf-8")) as Post[];
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://mharris.io/posts/${post.id}`,
      date: post.date,
    });
  });

  const xml = feed.xml({ indent: true });
  writeFileSync("public/rss.xml", xml);
})();
