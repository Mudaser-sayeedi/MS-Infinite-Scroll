// Dom element selections
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

// unsplash api configurations
const count = 30;
const apiKey = '6JpD97dOptCAxl9qBBpis_JMmMPwH0hBGKsaPk1AEXk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// global variables
let picList = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// when imges finished loadings
const imgLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// make set attribute cleaner
const setAttributes = (element, attributeObj) => {
    for (const key in attributeObj) {
        element.setAttribute(key,attributeObj[key]);
    }
}

// show the pictures which are fetched from the unsplash api
const showPictures = () => {
    imagesLoaded = 0;
    totalImages = picList.length;
    // loop through our array of picList
    picList.forEach((pic) => {
        // for each picture create a anchor element to link in unsplash
        const aElement = document.createElement('a');
        // aElement.setAttribute('href', pic.links.html);
        // aElement.setAttribute('target', '_blank');
        setAttributes(aElement, {
            href: pic.links.html,
            target: '_blank'
        });

        // create image element
        const imgElement = document.createElement('img');
        // imgElement.setAttribute('src', pic.urls.regular);
        // imgElement.setAttribute('alt', pic.alt_description);
        // imgElement.setAttribute('title', pic.alt_description);
        setAttributes(imgElement, {
            src: pic.urls.regular,
            alt: !pic.alt_description ? 'Have no description' : pic.alt_description,
            title: !pic.alt_description ? 'Have no description' : pic.alt_description
        });

        // check when each is finished loading
        imgElement.addEventListener('load',imgLoaded);

        // add img into anchor element and add anchor into img container
        aElement.appendChild(imgElement);
        imageContainer.appendChild(aElement);
    });
}

// fetching random pictures from unsplash API
const getPicture = async () => {
    try {
        const res = await fetch(apiUrl);
        picList = await res.json();
        showPictures();
    } catch (error) {
        //handel the error
    }
}

// check if the scrolling is near to buttom of the page load more pictures
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.hidden = false;
        getPicture();
    }
})

// onLoadOfPage
getPicture();