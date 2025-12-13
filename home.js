
async function loadRecentPosts() {
  const posts = await fetchPosts({ per_page: 6 });

  const container = document.getElementById("recent-posts");

  container.innerHTML = posts.map(post => `
    <article class="post">
      <img src="${post.featured_image}" alt="${post.title.rendered}">
      
      <div class="post-content">
        <h3><a href="post.html?id=${post.id}">${post.title.rendered}</a></h3>

        <div class="meta">
          <span class="author">${post._embedded.author[0].name}</span>
          <span class="date">${new Date(post.date).toLocaleDateString()}</span>
        </div>

        <p>${post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120)}...</p>

        <a class="read-more" href="post.html?id=${post.id}">Read more →</a>
      </div>
    </article>
  `).join("");
}

loadRecentPosts();
