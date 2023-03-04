const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const blog_content = document.querySelector("#blog-content").value.trim();

  if (title && blog_text) {
    const response = await fetch(`/api/blog`, {
      method: "POST",
      body: JSON.stringify({ title, blog_content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog.");
    }
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);
