const url = 'https://script.google.com/macros/s/AKfycbxFlQXkvna9jYamLWhTQ1k3cJItWZDvCYoCmLTcN-CJcr7vZw/exec';
const val = { page: 1 };
const page = {};
page.loadeMore = true;
page.container = document.createElement('div');
page.container.textContent = 'Hello world!'
page.main = document.querySelector('section')
page.main.append(page.container);
page.message = document.createElement('div');
page.message.textContent = 'Scroll to see more';
page.main.append(page.message);

initialLoad();

function initialLoad() {
    page.container.innerHTML = '';
    getCourses();
}

window.onscroll = (ev) => {
    const windowInnerHeight = window.innerHeight;
    const scrolly = window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    const heightOffBottom = 300;
    if ((windowInnerHeight + scrolly) >= (bodyHeight - heightOffBottom)) {
        if (page.loadeMore) {
            page.loadeMore = false;
            addNewPosts();
        }
    }
}

function addNewPosts() {
    val.page++;
    getCourses();
}

function renderPost(data) {
    data.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${post[8]}</h3>
        <div>${post[5]} starts by ${post[6]} students</div>
        <a href='${post[0]}' target='_blank'> ${post[2]}</a>
        <hr>
        `;
        page.container.appendChild(div);
    });
}

function getCourses() {
    const baseURL = url + '?p=' + val.page;
    page.message.textContent = 'Loading...';
    fetch(baseURL).then((rep) => rep.json())
        .then((json) => {
            if (json.data.pages.next != null) {
                page.loadeMore = true;
            } else{
                page.message.textContent = 'You have reached last page...';
            }
            console.log(json.data);
            renderPost(json.data.posts)
        })
}