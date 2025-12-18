async function loadRecentPosts() {
  const posts = await fetchPosts({ per_page: 20 });
  const container = document.getElementById("recent-posts");

  container.innerHTML = posts.map(post => {
    const id = post.id || null;
    const title = post.title?.rendered || "Untitled";
    const date = post.date ? new Date(post.date).toLocaleDateString() : "";
    const excerpt = post.excerpt?.rendered
      ? post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120)
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
}

loadRecentPosts();

