async function loadAllPosts() {
  const posts = await fetchPosts({ per_page: 100 });

  const container = document.getElementById("blog-posts");

  container.innerHTML = posts.map(post => `
    <article class="post">
      <img src="${post.featured_image}" alt="${post.title.rendered}">
      
      <div class="post-content">
        <h3><a href="post.html?id=${post.id}">${post.title.rendered}</a></h3>

        <div class="meta">
         <span class="author">${post._embedded?.author?.[0]?.name || "Unknown"}</span>

          <span class="date">${new Date(post.date).toLocaleDateString()}</span>
        </div>

        <p>${post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 150)}...</p>

        <a class="read-more" href="post.html?id=${post.id}">Read more →</a>
      </div>
    </article>
  `).join("");
}

loadAllPosts();
