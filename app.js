const API_BASE = "https://the-rebuild-project-blog.com/wp-json/wp/v2";


async function fetchPosts(options = {}) {
  const params = new URLSearchParams(options);
  params.append("_embed", "true");

  const res = await fetch(`${API_BASE}/posts?${params.toString()}`);
  const data = await res.json();

  return data.map(post => ({
    ...post,
    featured_image: post._embedded["wp:featuredmedia"]
      ? post._embedded["wp:featuredmedia"][0].source_url
      : "",
  }));
}

async function fetchPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}?_embed=true`);
  const post = await res.json();

  return {
    ...post,
    featured_image: post._embedded["wp:featuredmedia"]
      ? post._embedded["wp:featuredmedia"][0].source_url
      : "",
  };
}
