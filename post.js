function getPostIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadPost() {
  const id = getPostIdFromURL();
  const container = document.getElementById("post-container");

  if (!id) {
    container.innerHTML = "<p>No post ID provided.</p>";
    return;
  }

  const post = await fetchPostById(id);

  updateMetaTags(post);

  container.innerHTML = `
    <article class="single-post">
      <h1>${post.title.rendered}</h1>
      <p class="date">${new Date(post.date).toLocaleDateString()}</p>
      <img class="featured-image" src="${post.featured_image}" alt="${post.title.rendered}">
      <div class="content">
        ${post.content.rendered}
      </div>
      <p><a href="blog.html">← Back to Blog</a></p>
    </article>
  `;
}

loadPost();

function updateMetaTags(post) {
  document.title = post.title.rendered;

  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '');

  document.querySelector('meta[name="description"]').setAttribute("content", cleanExcerpt);
  document.querySelector('meta[property="og:title"]').setAttribute("content", post.title.rendered);
  document.querySelector('meta[property="og:description"]').setAttribute("content", cleanExcerpt);
  document.querySelector('meta[property="og:image"]').setAttribute("content", post.featured_image);
  document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
  document.querySelector('link[rel="canonical"]').setAttribute("href", window.location.href);
}
