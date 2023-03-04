const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const blog_content = document.querySelector("#blog-content").value.trim();
  const blogId = document.querySelector("#blogId").innerHTML;

  if (title && blog_content) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({ title, blog_content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update blog");
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete blog.");
    }
  }
};

document
  .querySelector(".edit-blog-form")
  .addEventListener("submit", editFormHandler);

document
  .querySelector(".delete-blog-btn")
  .addEventListener("click", delButtonHandler);
