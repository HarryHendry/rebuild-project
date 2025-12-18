async function loadRecentPosts() {
  try {
    const posts = await fetchPosts({ per_page: 20, _: Date.now() }); // cache-busting
    const container = document.getElementById("recent-posts");

    if (!container) return;

    // Sort posts by newest first
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sortedPosts.map(post => {
      const id = post.id;
      const title = post.title?.rendered || "Untitled";
      const date = post.date ? new Date(post.date).toLocaleDateString() : "";
      const excerpt = post.excerpt?.rendered
        ? post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120)
        : "";
      const author = post._embedded?.author?.[0]?.name || "Unknown";

      // Cache-busting on featured image to always get the latest
      const featuredImage =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        post.featured_image ||
        "images/placeholder.jpg";
      const imageUrl = `${featuredImage}?v=${new Date(post.modified).getTime()}`;

      const link = id ? `post.html?id=${id}` : "#";

      return `
        <article class="post">
          <img src="${imageUrl}" alt="${title}">
          
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

  } catch (err) {
    console.error("Failed to load recent posts:", err);
  }
}

// Ensure DOM exists before running
document.addEventListener("DOMContentLoaded", loadRecentPosts);
