var siteName = document.getElementById("bookmarkName")
var siteUrl = document.getElementById("siteUrl")
var submitBttn = document.getElementById("submitBttn")
var boxModal = document.querySelector(".modal");
var closeBttn = document.querySelector(".btn-close")
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var bookmarksArray = []


if (localStorage.getItem("bookmarksArray") != null) { 
    bookmarksArray = JSON.parse(localStorage.getItem("bookmarksArray"))
    disblayBookmark(bookmarksArray)
}


function addBookmark() { 
    bookmarksObject = { 
        name: siteName.value,
        url: siteUrl.value
    }

    if (isValidUrl(`${bookmarksObject.url}`)) { 
    } else { 
        var validURL = `https://${siteUrl.value}`;
        bookmarksObject.url =  validURL
    }

    console.log(bookmarksObject.url);

    if(siteName.value != "" && siteUrl.value != "") { 
        bookmarksArray.push(bookmarksObject)
        setLocalStorage()
        siteName.classList.add("is-valid")
        siteUrl.classList.add("is-valid")
        disblayBookmark(bookmarksArray)
        clear()
        

    }  else { 
        boxModal.classList.add("d-block")
    }





    
}

function disblayBookmark(list) { 

    var cartona = ``

    for (var i = 0 ; i < bookmarksArray.length ; i++ ) {
        cartona += `
        <tr>
        <td scope="row" class="p-3">${i+1}</td>
        <td>${bookmarksArray[i].name}</td>
        <td>
            <div class="btn btn-success">
                <a href="${bookmarksArray[i].url}" target="blank" class="text-decoration-none text-white">
                    Visit
                </a>
            </div>
        </td>
        <td>
            <button onclick="deleteBookmark(${i})" class="btn btn-danger">           
                    Delete
            </button>
        </td>
    </tr>
    
        `
    }

    document.getElementById("bookmarkTable").innerHTML = cartona
    
}

function deleteBookmark(index) { 
    bookmarksArray.splice(index,1)
    setLocalStorage() 
    disblayBookmark(bookmarksArray)
}

function clear() { 
    siteName.value = ""
    siteUrl.value = ""
}

function setLocalStorage() { 
    localStorage.setItem("bookmarksArray", JSON.stringify(bookmarksArray))
}

function closeModal() { 
    closeBttn.addEventListener("click", function() { 
        boxModal.classList.remove("d-block")
    })
}


siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
    validate(siteUrl, urlRegex);
});

function validate(element, regex) {
    var testRegex = regex;
        if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
        } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    }
}

function isValidUrl(siteUrl) { 
    return URL.canParse(siteUrl)
}

