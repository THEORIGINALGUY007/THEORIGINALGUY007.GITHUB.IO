document.addEventListener("DOMContentLoaded", function () {
    let id = 0;
    function createPostObject(id, challengeText, like, dislike, heart, comments) {
        return {
            id,
            challengeText,
            like,
            dislike,
            heart,
            comments
        }
    }
    function renderPost(challengeText, like, dislike, heart, comments) {
        if (challengeText) {
            const newPost = document.createElement("li");
            newPost.className = "post";
            newPost.innerHTML = `
                <h3>Challenge:</h3>
                <p  id="challenge${id}">${challengeText}</p>
                <div class="reactions">
                    <button class="like">👍</button>
                    <span class="like-count" id="like-count-${id}">${like}</span>
                    <button class="dislike">👎</button>
                    <span class="dislike-count" id="dislike-count-${id}">${dislike}</span>
                    <button class="heart">❤️</button>
                    <span class="heart-count" id="heart-count-${id}">${heart}</span>
                </div>
                <div class="comment-section">
                    <input type="text" placeholder="Add a comment" class="comment-input">
                    <button class="comment-button">Comment</button>
                    <div class="comments" id="comments-${id}">
                        ${comments.map(comment => `<div class="comment">${comment}</div>`)}
                    </div>
                </div>
            `;
            discussionList.appendChild(newPost);
        }
    }
    function getData() {
        if (localStorage.getItem('data')) {
            return JSON.parse(localStorage.getItem('data'));
        }
    }
    function setData(data) {
        console.log(data);
        const storedData = getData();
        if (storedData?.length > 0) {
            localStorage.setItem('data', JSON.stringify([...storedData, data]));
        } else {
            localStorage.setItem('data', JSON.stringify([data]));
        }
    }
    function handleReaction(button, reaction) {
        const reactionCount = button.parentElement.querySelector(`.${reaction}-count`);
        const id = parseInt(reactionCount.id.split('-')[2]);
        const data = getData();
        let count = parseInt(reactionCount.textContent);
        count = count + 1;
        const newData = data.map(d => {
            if (d.id === id)
                d[reaction] = count;
            return d
        });
        localStorage.setItem("data", JSON.stringify(newData));
        reactionCount.textContent = count;
    }

    const discussionList = document.getElementById("discussion-list");
    const addPost = document.getElementById("add-post");

    const data = getData();
    console.log(data)
    if (data?.length > 0) {
        data.forEach(element => {
            const { challengeText, like, dislike, heart, comments } = element;
            renderPost(challengeText, like, dislike, heart, comments);
        });
    }
    discussionList.addEventListener("click", function (event) {
        if (event.target.classList.contains("like")) {
            handleReaction(event.target, "like");
        } else if (event.target.classList.contains("dislike")) {
            handleReaction(event.target, "dislike");
        } else if (event.target.classList.contains("heart")) {
            handleReaction(event.target, "heart");
        }
    });

    discussionList.addEventListener("click", function (event) {
        if (event.target.classList.contains("comment-button")) {
            const commentInput = event.target.previousElementSibling;
            const commentText = commentInput.value;

            if (commentText) {
                const comments = event.target.nextElementSibling; console.log(event);
                console.log(comments);
                const comment = document.createElement("div");
                comment.className = "comment";
                comment.textContent = commentText;
                comments.appendChild(comment);
                commentInput.value = "";
            }
        }
    });

    addPost.addEventListener("click", function (event) {
        event.preventDefault();
        const challengeInput = document.getElementById("challenge");
        const challengeText = challengeInput.value;

        if (challengeText) {
            const newId = id + 1;
            const newPost = document.createElement("li");
            newPost.className = "post";
            newPost.innerHTML = `
                <h3>Challenge:</h3>
                <p id="challenge${newId}">${challengeText}</p>
                <div class="reactions">
                    <button class="like">👍</button>
                    <span class="like-count" id="like-count-${newId}">0</span>
                    <button class="dislike">👎</button>
                    <span class="dislike-count" id="dislike-count-${newId}">0</span>
                    <button class="heart">❤️</button>
                    <span class="heart-count" id="heart-count-${newId}">0</span>
                </div>
                <div class="comment-section">
                    <input type="text" placeholder="Add a comment" class="comment-input">
                    <button class="comment-button">Comment</button>
                    <div class="comments" id="comments-${newId}"></div>
                </div>
            `;
            const obj = createPostObject(newId, challengeText, 0, 0, 0, [])
            discussionList.appendChild(newPost);
            setData(obj);
            challengeInput.value = "";
        }
    });
});
