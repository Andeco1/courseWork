document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("click", function () {
            const photoId = this.getAttribute("data-photo-id");
            window.location.href = `planets.html?id=${photoId}`;
        });
    });
});
