const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-content").value.trim();
  const blogId = document.querySelector("#blogId").innerHTML;

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment_text, blogId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload;
    } else {
      alert("Failed to add comment.");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
