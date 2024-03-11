import fs from "fs";
import path from "path";
import type { Post } from "./post";
import { addHours } from "date-fns";

fs.readdir("./pages/posts", (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  const posts: Post[] = [];

  files.forEach((file, index) => {
    const filePath = path.join("./pages/posts", file);

    // Read the Vue file
    const content = fs.readFileSync(filePath, "utf8");

    // Simple regex to extract the props. Adjust these regexes based on your file structure.
    const dateMatch = content.match(/date:\s*["](.+?)["]/);
    const titleMatch = content.match(/title:\s*["](.+?)["]/);
    const excerptMatch = content.match(/excerpt:\s*["](.+?)["]/);

    if (dateMatch && titleMatch && excerptMatch) {
      posts.push({
        // Add 12 hours to the date to avoid annoying UTC to EST issue
        date: addHours(new Date(dateMatch[1]), 12),
        title: titleMatch[1],
        description: excerptMatch[1],
        href: `posts/${file.replace(/\.vue$/, "")}`,
        id: file.replace(/\.vue$/, ""),
      });
    }
  });

  // sort posts by date descending
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Write the JSON output
  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2), "utf8");
  console.log(`Posts metadata has been written to posts.json.`);
});
