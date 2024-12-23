//  ProvGallery v1.0.0 
//  Created by: Cebucoder/ Daniel Abellana
//  GitHub Repository: https://github.com/yourusername/provgallery 
//  Description: ProvGallery is a lightweight JavaScript and CSS library for creating responsive image galleries. 
//  License: MIT 


document.addEventListener("DOMContentLoaded", function () {



    // Add the module script for modern browsers
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';

    // Add the fallback nomodule script for older browsers
    const noModuleScript = document.createElement('script');
    noModuleScript.setAttribute('nomodule', '');
    noModuleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';

    // Append the scripts to the document head
    document.body.appendChild(moduleScript);
    document.body.appendChild(noModuleScript);

    const proweaverGalleryList = document.querySelectorAll('#proweaver_gallery_list img');
    const proweaverGalleryListClass = document.querySelectorAll('#proweaver_gallery_list li');
    let currentIndex = 0; // Ensure this is defined globally to track the current image
    let isImageClicked = false; // Flag to enable/disable wheel navigation


    // Create Viewer if it doesn't exist
    function createViewer() {
        if (!document.querySelector('.proweaver_gall_viewer_con')) {
            const viewerHTML = `
      <div class="proweaver_gall_viewer_con">
        <div class="proweaver_gall_holder">
            <div class="proweaver_gall_header">
                <div id="pro_gallery_counterList" class="proweaver_header_right_con"><span id="prov_current_gallery_show">0</span>/<span id="prov_total_gall_list">0</span></div>
                <div class="proweaver_header_left_con">
                    <div class="prov_image_sizer">
                        <span title="Zoom" class="zoom_function"><ion-icon name="search-outline"></ion-icon> <ion-icon class="zoom_plus" name="add-outline"></ion-icon></span>
                        <select name="" id="prov_zooming_selector">
                            <option value="100%">100%</option>
                            <option value="90%">90%</option>
                            <option value="80%">80%</option>
                        </select>
                    </div>
                    <div title="Gallery" id="prov_view_min_gallery"  class="prov_view_min_gallery"><ion-icon name="grid-outline"></ion-icon></div>
                    <div title="Close" id="prov_gall_close" class="prov_gall_close"><ion-icon name="close-outline"></ion-icon></div>
                </div>
            </div>
            <div class="proweaver_gall_img_viewer">
                <figure>
                    <img id="gallery_img_id_viewer" class="zoom" src="" alt="">
                </figure>
            </div>
            <div class="prov_gallery_controller">
              <div class="prov_conroller prov_prev"><ion-icon name="chevron-back-outline"></ion-icon></div>
              <div class="prov_conroller prov_next"><ion-icon name="chevron-forward-outline"></ion-icon></div>
          </div>
        </div>
        <div id="prov_min_gall_list" class="prov_min_gall_list">
            <ul id="prov_thumb_list" class="prov_thumb_list">
                
            </ul>
        </div>
      </div>`;
            // Find the gallery list element
            const galleryListCon = document.getElementById('proweaver_gallery_list');

            // Append viewerHTML right after the gallery list
            galleryListCon.insertAdjacentHTML('afterend', viewerHTML);
        }
    }

    // Initialize Viewer
    createViewer();



    proweaverGalleryList.forEach((galleryItems, index) => {
        console.log(index + 1)
        galleryItems.id = `galleryItems-${index + 1}`;//add id's on each img 
        galleryItems.classList = `gallImg`;//add id's on each img 
        let provGalleryCounter = document.getElementById('prov_total_gall_list');
        provGalleryCounter.innerHTML = `${index + 1}`;
    });

    $('.gallImg').each(function () {
        const altValue = $(this).attr('alt'); // Get the alt attribute of each image

        // Check if alt value is empty or undefined
        if (!altValue) {
            // If the alt attribute is missing or empty, set a default alt value
            $(this).attr('alt', 'image'); // You can change 'image' to any default text you prefer

        }
    });


    // Function to update the viewer image
    function updateViewer(index) {
        const galleryItemsImg = proweaverGalleryList[index];
        const galleryItemsImgAlt = galleryItemsImg.alt;

        // Fade out, change the src, and then fade in
        $('#gallery_img_id_viewer').fadeOut(150, function () {
            $(this).attr('src', galleryItemsImg.src)
                .attr('alt', galleryItemsImgAlt || "image")
                .fadeIn(150); // Fade in the new image
        });

        // Show the viewer
        $('.proweaver_gall_viewer_con').show().fadeIn();
        $('.proweaver_gall_viewer_con').addClass('toggleproweaver_gall_viewer_con');

        // Update the current gallery show text
        const provCurrentGalleryShow = document.getElementById('prov_current_gallery_show');
        $('body').css('overflow', 'hidden');
        provCurrentGalleryShow.innerHTML = index + 1; // Update current index display

        highlightMatchingThumbnail(galleryItemsImg.src); // Call your highlight function


    }

    // Event listeners for each gallery item
    proweaverGalleryListClass.forEach((galleryItems, index) => {
        galleryItems.classList.add('prov_gall_list'); // Add class to each li
        galleryItems.addEventListener('click', function () {
            isImageClicked = true; // Enable wheel navigation
            currentIndex = index; // Update current index
            updateViewer(currentIndex); // Update viewer with the selected image
            console.log(createViewer())
            createViewer();


        });

    });



    // Previous button functionality
    document.querySelector('.prov_prev').addEventListener('click', function () {
        if (proweaverGalleryList.length === 0) return; // Prevent errors if no images exist
        isImageClicked = true; // Enable wheel navigation
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : proweaverGalleryList.length - 1; // Loop back to the last image
        updateViewer(currentIndex); // Update viewer with the new index
    });

    // Next button functionality
    document.querySelector('.prov_next').addEventListener('click', function () {
        if (proweaverGalleryList.length === 0) return; // Prevent errors if no images exist
        isImageClicked = true; // Enable wheel navigation
        currentIndex = (currentIndex < proweaverGalleryList.length - 1) ? currentIndex + 1 : 0; // Loop back to the first image
        updateViewer(currentIndex); // Update viewer with the new index
    });


    // Mouse wheel navigation
    $(window).on('wheel', function (event) {
        if (!isImageClicked) return;

        if (event.originalEvent.deltaY > 0) {
            // Scrolling down
            currentIndex = (currentIndex < proweaverGalleryList.length - 1) ? currentIndex + 1 : 0;
        } else {
            // Scrolling up
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : proweaverGalleryList.length - 1;
        }
        updateViewer(currentIndex);
    });

    // Disable wheel navigation when clicking outside thumbnails or images
    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('#proweaver_gallery_list') && !target.closest('#gallery_img_id_viewer')) {
            isImageClicked = false;
        }
    });


    // Function to check and highlight the matching thumbnail based on the viewer image source
    function highlightMatchingThumbnail(viewerSrc) {
        const proweaverMiniGalleryListClass = document.querySelectorAll('#prov_thumb_list li');
        proweaverMiniGalleryListClass.forEach(item => {
            const img = item.querySelector('img');

            // Remove the 'min_gall_selected' class from all items
            item.classList.remove('min_gall_selected');

            // Add the 'min_gall_selected' class if the thumbnail's image source matches the viewer's source
            if (img && img.src === viewerSrc) {
                item.classList.add('min_gall_selected');
            }
        });
    }


    let provViewMinGallery = document.getElementById('prov_view_min_gallery');
    let proMinGallList = document.getElementById('prov_min_gall_list');
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            $('.proweaver_gall_viewer_con').fadeOut();
            proweaverGalleryList.src = ''; // Optionally reset the viewer image
            $('body').css('overflow', 'scroll');
            proMinGallList.classList.remove('toggle_prov_min_gall_list');
            isImageClicked = false;
        }
    });

    provViewMinGallery.addEventListener('click', function () {
        proMinGallList.classList.toggle('toggle_prov_min_gall_list');
    })


    $('#prov_gall_close').click(function () {
        $('.proweaver_gall_viewer_con').fadeOut();
        isImageClicked = false;
        console.log('image reset');
        $('body').css('overflow', 'unset');
    })




    // Mini Gallery


    let provOriginalList = document.querySelectorAll('#proweaver_gallery_list li');
    let proMiniThumbnailList = document.getElementById('prov_thumb_list');



    provOriginalList.forEach((provThumbList) => {
        let proNewItem = document.createElement('li');
        proNewItem.innerHTML = provThumbList.innerHTML;
        proMiniThumbnailList.appendChild(proNewItem);

        proNewItem.addEventListener('click', function () {
            // Remove 'selected' class from all <li> elements
            let provMiniThumbs = document.querySelectorAll('#prov_thumb_list li');
            // let
            provMiniThumbs.forEach(MiniThumb => MiniThumb.classList.remove('min_gall_selected'));

            // Add 'selected' class to the clicked <li>
            this.classList.add('min_gall_selected');


        });
    })

    const proweaverMiniGalleryListClass = document.querySelectorAll('#prov_thumb_list li');

    proweaverMiniGalleryListClass.forEach((galleryItems, index) => {
        galleryItems.classList.add('prov_mini_gall_list'); // Add class to each li
        galleryItems.addEventListener('click', function () {
            let galleryItemsImg = this.querySelector('img');
            if (galleryItemsImg) {
                // Update the main viewer with the clicked thumbnail's image
                document.getElementById('gallery_img_id_viewer').src = galleryItemsImg.src;

                // Optionally add class to indicate selected thumbnail
                proweaverMiniGalleryListClass.forEach(item => item.classList.remove('selected')); // Remove selected class from all
                this.classList.add('selected'); // Add selected class to the current thumbnail

                // Update viewer UI and current index
                document.querySelector('.proweaver_gall_viewer_con').classList.add('toggleproweaver_gall_viewer_con'); // Show the viewer
                document.getElementById('prov_current_gallery_show').innerHTML = index + 1; // Display current index
                currentIndex = index; // Update current index

                // If you want to highlight or show the thumbnail in a specific way, you can call this function
                highlightMatchingThumbnail(galleryItemsImg.src); // Call your highlight function if needed
                proMinGallList.classList.remove('toggle_prov_min_gall_list');
            }
        });

    });


    document.addEventListener('keydown', function (e) {
        useKey(e); // Call useKey function when a key is pressed
    });

    function useKey(e) {
        e = e || window.event;
        if (e.keyCode == '37') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : proweaverGalleryList.length - 1; // Loop back to the last image
            updateViewer(currentIndex); // Update viewer with the new index
            console.log("Left");
        }
        else if (e.keyCode == '39') {
            currentIndex = (currentIndex < proweaverGalleryList.length - 1) ? currentIndex + 1 : 0; // Loop back to the first image
            updateViewer(currentIndex); // Update viewer with the new index
            console.log("Right");
        }
    }

});


$(document).ready(function () {
    const viewer = $('#gallery_img_id_viewer');

    let isZoomed = false;
    let scale = 1;
    let startX, startY, initialX, initialY;

    // Function to toggle zoom and adjust image position based on cursor location
    function toggleZoom(event) {
        const viewerOffset = viewer.offset();
        const mouseX = event.pageX - viewerOffset.left;
        const mouseY = event.pageY - viewerOffset.top;

        if (!isZoomed) {
            scale = 2; // Set zoom level
            isZoomed = true;

            // Calculate the translation to center the zoom based on cursor position
            const translateX = -((mouseX * (scale - 1)) / scale);
            const translateY = -((mouseY * (scale - 1)) / scale);

            // Apply zoom and translation
            viewer.css({
                transform: `scale(${scale}) `,
                transition: 'transform 0.3s ease' // Smooth zoom transition
            });

            // Enable dragging
            viewer.on('mousedown', startDragging);
            $(document).on('mouseup', stopDragging);
            $(document).on('mousemove', dragImage);
        } else {
            scale = 1; // Reset scale
            isZoomed = false;

            // Reset image position and scale
            viewer.css({
                transform: 'scale(1) translate(0px, 0px)',
                transition: 'transform 0.3s ease'
            });
        }
    }

    // Zoom function on double click
    viewer.on('dblclick', toggleZoom);

    // Zoom function on button click
    $('.zoom_function').click(toggleZoom);

    function startDragging(event) {
        if (!isZoomed) return;
        event.preventDefault(); // Prevent default drag behavior
        startX = event.clientX;
        startY = event.clientY;

        // Get initial positions
        initialX = viewer.position().left;
        initialY = viewer.position().top;

    }
});
