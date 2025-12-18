const API_BASE = "https://the-rebuild-project-blog.com/wp-json/wp/v2";

// Fetch ALL posts safely
async function fetchPosts(options = {}) {
  const params = new URLSearchParams({
    per_page: 100,
    _embed: "true",
    ...options
  });

  const res = await fetch(`${API_BASE}/posts?${params.toString()}`);
  const data = await res.json();

  return data.map(post => {
    const featured =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      post.featured_image ||
      "images/placeholder.jpg";

    return {
      ...post,
      featured_image: featured
    };
  });
}

// Fetch a single post safely
async function fetchPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}?_embed=true`);
  const post = await res.json();

  const featured =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post.featured_image ||
    "images/placeholder.jpg";

  return {
    ...post,
    featured_image: featured
  };
}
