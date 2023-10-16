document.addEventListener("DOMContentLoaded", function () {
    const discussionList = document.getElementById("discussion-list");
    const postForm = document.getElementById("post-form");

    discussionList.addEventListener("click", function (event) {
        if (event.target.classList.contains("like")) {
            handleReaction(event.target, "like");
        } else if (event.target.classList.contains("dislike")) {
            handleReaction(event.target, "dislike");
        } else if (event.target.classList.contains("heart")) {
            handleReaction(event.target, "heart");
        }
    });

    function handleReaction(button, reaction) {
        const reactionCount = button.parentElement.querySelector(`.${reaction}-count`);
        let count = parseInt(reactionCount.textContent);
        count++;
        reactionCount.textContent = count;
    }

    discussionList.addEventListener("click", function (event) {
        if (event.target.classList.contains("comment-button")) {
            const commentInput = event.target.previousElementSibling;
            const commentText = commentInput.value;

            if (commentText) {
                const comments = event.target.nextElementSibling;
                const comment = document.createElement("div");
                comment.className = "comment";
                comment.textContent = commentText;
                comments.appendChild(comment);

                commentInput.value = "";
            }
        }
    });

    postForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const challengeInput = document.getElementById("challenge");
        const challengeText = challengeInput.value;

        if (challengeText) {
            const newPost = document.createElement("li");
            newPost.className = "post";
            newPost.innerHTML = `
                <h3>Challenge:</h3>
                <p>${challengeText}</p>
                <div class="reactions">
                    <button class="like">👍</button>
                    <span class="like-count">0</span>
                    <button class="dislike">👎</button>
                    <span class="dislike-count">0</span>
                    <button class="heart">❤️</button>
                    <span class="heart-count">0</span>
                </div>
                <div class="comment-section">
                    <input type="text" placeholder="Add a comment" class="comment-input">
                    <button class="comment-button">Comment</button>
                    <div class="comments"></div>
                </div>
            `;

            discussionList.appendChild(newPost);
            challengeInput.value = "";
        }
    });
});
