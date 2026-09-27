let passages = JSON.parse(localStorage.getItem("typingPassages")) || [];


function addPassage() {

    const title =
        document.getElementById("passageTitle").value.trim();

    const content =
        document.getElementById("passageContent").value.trim();


    if (title === "" || content === "") {

        alert("Please enter title and passage.");

        return;
    }


    passages.push({

        title: title,
        content: content

    });


    localStorage.setItem(
        "typingPassages",
        JSON.stringify(passages)
    );


    document.getElementById("passageTitle").value = "";

    document.getElementById("passageContent").value = "";


    displayPassages();
}


function displayPassages() {

    const list =
        document.getElementById("passageList");

    list.innerHTML = "";


    passages.forEach(function(passage, index) {

        const div =
            document.createElement("div");

        div.className = "admin-passage";


        div.innerHTML = `

            <h3>${passage.title}</h3>

            <p>${passage.content}</p>

            <button onclick="deletePassage(${index})">
                Delete
            </button>

        `;


        list.appendChild(div);

    });

}


function deletePassage(index) {

    passages.splice(index, 1);


    localStorage.setItem(
        "typingPassages",
        JSON.stringify(passages)
    );


    displayPassages();

}


displayPassages();