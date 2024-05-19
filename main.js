var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});




//post
document.addEventListener('DOMContentLoaded', function() {
    const plusButton = document.getElementById('plusButton');
    const createPostBtn = document.getElementById('createPostBtn');
    const postMediaInput = document.getElementById('postMedia');
    const postCaptionInput = document.getElementById('postCaption');
    const postsContainer = document.getElementById('postsContainer');

    plusButton.addEventListener('click', function() {
        // Toggle visibility of media input and caption input
        postMediaInput.classList.toggle('hidden');
        postCaptionInput.classList.toggle('hidden');
        createPostBtn.classList.toggle('hidden');
    });

    createPostBtn.addEventListener('click', function() {
        const mediaFile = postMediaInput.files[0];
        const postCaption = postCaptionInput.value.trim();

        if (!mediaFile) {
            alert('Please select an image or video.');
            return;
        }

        if (postCaption === '') {
            alert('Please enter a caption for your post.');
            return;
        }

        createPost(mediaFile, postCaption);
        postMediaInput.value = ''; // Clear input field after creating post
        postCaptionInput.value = ''; // Clear input field after creating post

        // Hide media input and caption input after posting
        postMediaInput.classList.add('hidden');
        postCaptionInput.classList.add('hidden');
        createPostBtn.classList.add('hidden');
    });

    function createPost(mediaFile, caption) {
        const post = document.createElement('div');
        post.classList.add('bg-white', 'shadow', 'rounded', 'p-4', 'mb-4');

        // Create media element
        const mediaElement = document.createElement(mediaFile.type.startsWith('image') ? 'img' : 'video');
        mediaElement.classList.add('w-full', 'mb-2');
        mediaElement.src = URL.createObjectURL(mediaFile);
        mediaElement.controls = true;

        // Create caption element
        const captionElement = document.createElement('p');
        captionElement.classList.add('text-lg', 'font-semibold', 'mb-2');
        captionElement.textContent = caption;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('bg-red-500', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'delete-post');
        deleteBtn.textContent = 'Delete';

        // Append elements to post container
        post.appendChild(mediaElement);
        post.appendChild(captionElement);
        post.appendChild(deleteBtn);

        postsContainer.appendChild(post);

        // Add event listener to delete button
        deleteBtn.addEventListener('click', function() {
            post.remove();
        });
    }
});



