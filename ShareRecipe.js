document.addEventListener('DOMContentLoaded', () => {
    const audioElements = {
        default: document.getElementById('music-default'),
        liyue: document.getElementById('music-liyue'),
        'fragile-fantasy': document.getElementById('music-fragile-fantasy'),
        'ruus-song': document.getElementById('music-ruus-song')
    };

    function stopAllTracks() {
        Object.values(audioElements).forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }

    function playMusic(track) {
        stopAllTracks();
        if (track) {
            track.play().catch(error => {
                console.log('Autoplay failed:', error);
            });
        }
    }

    document.getElementById('music-select').addEventListener('change', (e) => {
        const selectedMusic = e.target.value;

        Object.values(audioElements).forEach(audio => {
            audio.style.display = 'none';
        });

        if (selectedMusic === 'none') {
            stopAllTracks();
            return;
        }

        const audioToPlay = audioElements[selectedMusic];
        if (audioToPlay) {
            audioToPlay.style.display = 'block';
            playMusic(audioToPlay);
        }
    });

    stopAllTracks();
});

document.addEventListener('DOMContentLoaded', function () {
    const chefNameInput = document.getElementById('chef-name');
    const dishNameInput = document.getElementById('dish-name');
    const categoryInput = document.getElementById('category');
    const ingredientsInput = document.getElementById('ingredients');
    const previewChef = document.getElementById('preview-chef');
    const previewDish = document.getElementById('preview-dish');
    const previewCategory = document.getElementById('preview-category');
    const previewIngredients = document.getElementById('preview-ingredients');
    const previewInstructions = document.getElementById('preview-steps');
    const addStepButton = document.getElementById('add-step');
    const stepsContainer = document.getElementById('steps');
    let stepCount = 1;

    const chefPhotoInput = document.getElementById('chef-photo-input');
    const dishPhotoInput = document.getElementById('dish-photo-input');

    chefNameInput.addEventListener('input', () => previewChef.textContent = chefNameInput.value || 'N/A');
    dishNameInput.addEventListener('input', () => previewDish.textContent = dishNameInput.value || 'N/A');
    categoryInput.addEventListener('input', () => previewCategory.textContent = categoryInput.value || 'N/A');
    ingredientsInput.addEventListener('input', () => previewIngredients.textContent = ingredientsInput.value || 'N/A');

    function handleImageUpload(input, previewElement, previewContainer) {
        input.addEventListener('change', function () {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewElement.style.backgroundImage = `url(${e.target.result})`;
                previewContainer.style.backgroundImage = `url(${e.target.result})`;
            };
            if (input.files[0]) {
                reader.readAsDataURL(input.files[0]);
            }
        });
    }

    document.getElementById('chef-photo').addEventListener('click', () => chefPhotoInput.click());
    document.getElementById('dish-photo').addEventListener('click', () => dishPhotoInput.click());
    handleImageUpload(chefPhotoInput, document.getElementById('chef-photo'), document.getElementById('preview-chef-photo'));
    handleImageUpload(dishPhotoInput, document.getElementById('dish-photo'), document.getElementById('preview-dish-photo'));

    addStepButton.addEventListener('click', function () {
        const stepWrapper = document.createElement('div');
        stepWrapper.classList.add('step');

        const stepNumber = document.createElement('div');
        stepNumber.classList.add('step-number');
        stepNumber.textContent = `Step ${stepCount}`;

        const stepInput = document.createElement('textarea');
        stepInput.placeholder = `Describe Step ${stepCount}`;

        stepInput.addEventListener('input', updatePreview);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Step';
        deleteButton.addEventListener('click', function () {
            stepWrapper.remove();
            updatePreview();
        });

        stepWrapper.appendChild(stepNumber);
        stepWrapper.appendChild(stepInput);
        stepWrapper.appendChild(deleteButton);

        stepsContainer.appendChild(stepWrapper);

        stepCount++;
        updatePreview();
    });

    function updatePreview() {
        const steps = document.querySelectorAll('#steps textarea');
        previewInstructions.innerHTML = '';

        steps.forEach((step, index) => {
            const li = document.createElement('li');
            li.textContent = `Step ${index + 1}: ${step.value}`;
            previewInstructions.appendChild(li);
        });
    }

    window.shareTwitter = function () {
        const chefName = chefNameInput.value;
        const dishName = dishNameInput.value;
        const category = categoryInput.value;
        const url = window.location.href;

        const text = `${dishName} by ${chefName} - Recipe for ${category}`;
        const shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareLink, '_blank');
    };

    window.shareLinkedIn = function () {
        const chefName = chefNameInput.value;
        const dishName = dishNameInput.value;
        const category = categoryInput.value;
        const url = window.location.href;

        const text = `${dishName} by ${chefName} - Recipe for ${category}`;
        const shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareLink, '_blank');
    };

    window.shareFacebook = function () {
        const url = window.location.href;
        const shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareLink, '_blank');
    };

    window.shareEmail = function () {
        const chefName = chefNameInput.value;
        const dishName = dishNameInput.value;
        const category = categoryInput.value;
        let instructions = '';
        document.querySelectorAll('#steps textarea').forEach(function (step, index) {
            instructions += `Step ${index + 1}: ${step.value}\n`;
        });

        const subject = `Recipe: ${dishName} by ${chefName}`;
        const body = `
            Chef: ${chefName}
            Dish: ${dishName}
            Category: ${category}
            Ingredients:
            ${ingredientsInput.value}
            
            Instructions:
            ${instructions}
        `;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    window.shareInstagram = function () {
        const chefName = chefNameInput.value;
        const dishName = dishNameInput.value;
        const category = categoryInput.value;
        const url = window.location.href;
        const instagramMessage = `Check out this recipe: ${dishName} by ${chefName} - Category: ${category}. Link: ${url}`;
        const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
        window.open(instagramUrl, '_blank');
    };

    window.shareWhatsApp = function () {
        const chefName = chefNameInput.value;
        const dishName = dishNameInput.value;
        const category = categoryInput.value;
        const url = window.location.href;
        const text = `Check out this recipe: ${dishName} by ${chefName} - Category: ${category}. Link: ${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };
});

document.addEventListener('DOMContentLoaded', function () {
    const shareRecipeButton = document.getElementById('share-recipe');
    const recipePreview = document.getElementById('recipe priview');
    const socialShare = document.getElementById('social-share');

    socialShare.style.display = 'none';

    shareRecipeButton.addEventListener('click', function () {
        recipePreview.style.display = 'none';
        socialShare.style.display = 'flex';

        const shareMessage = document.createElement('p');
        shareMessage.textContent = 'You can share your recipe through the icons below:';
        shareMessage.style.textAlign = 'center';
        shareMessage.style.marginTop = '20px';
        shareMessage.style.fontWeight = 'bold';
        socialShare.insertAdjacentElement('beforebegin', shareMessage);
        const recipeForm = document.getElementById('recipe-form');
        recipeForm.style.display = 'none';
    });
});
