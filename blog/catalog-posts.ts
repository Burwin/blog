import fs from "fs/promises";
import matter from "gray-matter";

(async () => {
  const posts = await fs.readdir("./posts");

  const data = await Promise.all(
    posts.map(async (filename) => {
      const file = matter.read(`./posts/${filename}`, { excerpt: true });

      const { data, excerpt, path } = file;
      return {
        ...data,
        excerpt,
        path: path.replace(/\.mdx?$/, "").replace("./posts/", ""),
      };
    })
  );

  await fs.writeFile("./data.json", JSON.stringify(data), "utf-8");
})();
