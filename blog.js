
async function loadAllPosts() {
  try {
    // Fetch posts with cache-busting query to always get the latest
    const posts = await fetchPosts({ per_page: 100, _: Date.now() });
    const container = document.getElementById("blog-posts");

    if (!container) {
      console.error("blog-posts container not found");
      return;
    }

    // Filter out posts that are not published (extra safety)
    const publishedPosts = posts.filter(post => post.status === "publish");

    // Render posts
    container.innerHTML = publishedPosts.map(post => {
      const id = post.id;
      const title = post.title?.rendered || "Untitled";
      const date = post.date ? new Date(post.date).toLocaleDateString() : "";
      const excerpt = post.excerpt?.rendered
        ? post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 150)
        : "";
      const author = post._embedded?.author?.[0]?.name || "Unknown";

      const featuredImage =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        post.featured_image ||
        "images/placeholder.jpg";

      const link = id ? `post.html?id=${id}` : "#";

      return `
        <article class="post">
          <img src="${featuredImage}" alt="${title}">
          <div class="post-content">
            <h3><a href="${link}">${title}</a></h3>
            <div class="meta">
              <span class="author">${author}</span>
              <span class="date">${date}</span>
            </div>
            <p>${excerpt}...</p>
            <a class="read-more" href="${link}">Read more →</a>
          </div>
        </article>
      `;
    }).join("");

    console.log("Blog posts rendered:", publishedPosts.length);

  } catch (err) {
    console.error("Failed to load posts:", err);
  }
}

// Ensure the DOM exists before running
document.addEventListener("DOMContentLoaded", loadAllPosts);
