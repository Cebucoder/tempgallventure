//  ProvGallery v1.0.0 
//  Created by: Cebucoder/ Daniel Abellana
//  GitHub Repository: https://github.com/yourusername/provgallery 
//  Description: ProvGallery is a lightweight JavaScript and CSS library for creating responsive image galleries. 
//  License: MIT 


document.addEventListener("DOMContentLoaded", function () {



    // Add the module script for modern browsers
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.src = 'https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js';

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
        galleryItems.id = `galleryItems-${index + 1}`;//add id's on each img 
        galleryItems.classList = `gallImg`;//add id's on each img 
        let provGalleryCounter = document.getElementById('prov_total_gall_list');
        provGalleryCounter.innerHTML = `${index + 1}`;
        // Check if the loading attribute is missing, and add it
        if (!galleryItems.hasAttribute("loading")) {
            galleryItems.setAttribute("loading", "lazy");
        }
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
            createViewer();


        });

    });



    // Previous button functionality
    document.querySelector('.prov_prev').addEventListener('click', function () {
        if (proweaverGalleryList.length === 0) return; // Prevent errors if no images exist
        isImageClicked = true; // Enable wheel navigation
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : proweaverGalleryList.length - 1; // Loop back to the last image
        updateViewer(currentIndex); // Update viewer with the new index
        resetZoom(); // Reset zoom before switching images
        viewer.css({
            transform: "scale(1) translate(0px, 0px)", // Ensure transform resets
            transition: "none"
        });
    });

    // Next button functionality
    document.querySelector('.prov_next').addEventListener('click', function () {
        if (proweaverGalleryList.length === 0) return; // Prevent errors if no images exist
        isImageClicked = true; // Enable wheel navigation
        currentIndex = (currentIndex < proweaverGalleryList.length - 1) ? currentIndex + 1 : 0; // Loop back to the first image
        updateViewer(currentIndex); // Update viewer with the new index
        resetZoom(); // Reset zoom before switching images
        viewer.css({
            transform: "scale(1) translate(0px, 0px)", // Ensure transform resets
            transition: "none"
        });
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
            document.getElementById('gallery_img_id_viewer').src = '';
            $('body').css('overflow', 'scroll');
            proMinGallList.classList.remove('toggle_prov_min_gall_list');
            isImageClicked = false;
            resetZoom();
        }
    });

    provViewMinGallery.addEventListener('click', function () {
        proMinGallList.classList.toggle('toggle_prov_min_gall_list');
    })


    $('#prov_gall_close').click(function () {
        $('.proweaver_gall_viewer_con').fadeOut();
        document.getElementById('gallery_img_id_viewer').src = '';
        isImageClicked = false;
        $('body').css('overflow', 'unset');
        resetZoom();
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
            resetZoom(); // Reset zoom before switching images
            viewer.css({
                transform: "scale(1) translate(0px, 0px)", // Ensure transform resets
                transition: "none"
            });
        }
        else if (e.keyCode == '39') {
            currentIndex = (currentIndex < proweaverGalleryList.length - 1) ? currentIndex + 1 : 0; // Loop back to the first image
            updateViewer(currentIndex); // Update viewer with the new index
            resetZoom(); // Reset zoom before switching images
            viewer.css({
                transform: "scale(1) translate(0px, 0px)", // Ensure transform resets
                transition: "none"
            });
        }
    }

    const viewer = $("#gallery_img_id_viewer");
    let isZoomed = false, scale = 1;
    let isDragging = false; // Tracks if dragging is active
    let startX, startY, initialTranslateX = 0, initialTranslateY = 0;
    let initialTouchDistance = 0; // To store the initial distance between two fingers for pinch-to-zoom

    const zoomFunction = $(".zoom_function");
    const zoomIcon = $(".zoom_plus"); // The zoom icon to toggle

    // Function to reset zoom and position
    function resetZoom() {
        scale = 1;
        isZoomed = false;
        initialTranslateX = 0;
        initialTranslateY = 0;
        viewer.css({
            transform: "scale(1) translate(0px, 0px)",
            transition: "transform 0.4s ease-out"
        });
        viewer.css("cursor", "default");
        zoomIcon.attr("name", "add-outline"); // Reset to zoom-in icon
    }

    // Toggle zoom on click of zoom button or double-click on image
    function toggleZoom(event, centerZoom = false) {
        const viewerOffset = viewer.offset(),
            viewerWidth = viewer.width(),
            viewerHeight = viewer.height();

        let mouseX, mouseY;

        if (centerZoom) {
            mouseX = viewerWidth / 2;
            mouseY = viewerHeight / 2;
        } else {
            mouseX = event.pageX - viewerOffset.left;
            mouseY = event.pageY - viewerOffset.top;
        }

        if (isZoomed) {
            resetZoom();
        } else {
            scale = 2;
            isZoomed = true;

            const translateX = -(mouseX * (scale - 1) / scale),
                translateY = -(mouseY * (scale - 1) / scale);

            initialTranslateX = translateX;
            initialTranslateY = translateY;

            viewer.css({
                transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                transition: "transform 0.4s ease-out"
            });

            viewer.css("cursor", "grab");
            zoomIcon.attr("name", "remove-outline"); // Change to zoom-out icon
        }
    }

    // Bind zoom functionality to the zoom button
    zoomFunction.click(function (event) {
        if (isZoomed) {
            resetZoom(event);
            viewer.css("cursor", "default");
            zoomIcon.attr("name", "add-outline"); // Change to zoom-in icon
        } else {
            scale = 2;
            isZoomed = true;
            viewer.css({
                transform: `scale(${scale})`,
                transition: "transform 0.4s ease-out"
            });
            viewer.css("cursor", "grab");
            zoomIcon.attr("name", "remove-outline"); // Change to zoom-out icon
        }
    });

    // Handle mouse and touch dragging
    function startDragging(event) {
        if (isZoomed) {
            if (event.originalEvent.touches && event.originalEvent.touches.length === 1) { // Check if exactly 1 finger is touching (mobile touch)
                event.preventDefault();
                isDragging = true;
                startX = event.originalEvent.touches[0].clientX;
                startY = event.originalEvent.touches[0].clientY;
                viewer.css("cursor", "grabbing");
            } else if (event.clientX && event.clientY) { // Mouse dragging for desktop
                event.preventDefault();
                isDragging = true;
                startX = event.clientX;
                startY = event.clientY;
                viewer.css("cursor", "grabbing");
            }
        }
    }

    function stopDragging() {
        if (isZoomed) {
            isDragging = false;
            viewer.css("cursor", "grab");
        }
    }

    function dragImage(event) {
        if (isZoomed && isDragging) {
            event.preventDefault();
            let deltaX, deltaY;

            if (event.originalEvent.touches && event.originalEvent.touches.length === 1) { // Mobile touch dragging
                deltaX = (event.originalEvent.touches[0].clientX - startX) / scale;
                deltaY = (event.originalEvent.touches[0].clientY - startY) / scale;
            } else if (event.clientX && event.clientY) { // Desktop mouse dragging
                deltaX = (event.clientX - startX) / scale;
                deltaY = (event.clientY - startY) / scale;
            }

            initialTranslateX += deltaX;
            initialTranslateY += deltaY;

            viewer.css({
                transform: `scale(${scale}) translate(${initialTranslateX}px, ${initialTranslateY}px)`,
                transition: "none" // Disable transition for dragging
            });

            startX = event.clientX || event.originalEvent.touches[0].clientX;
            startY = event.clientY || event.originalEvent.touches[0].clientY;
        }
    }

    // Pinch-to-zoom functionality for mobile
    function handlePinchZoom(event) {
        if (event.originalEvent.touches.length === 2) {
            // Calculate the distance between the two fingers
            const touch1 = event.originalEvent.touches[0];
            const touch2 = event.originalEvent.touches[1];

            const touchDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
            );

            if (initialTouchDistance === 0) {
                initialTouchDistance = touchDistance;
            }

            // Calculate the scale factor based on distance change
            const scaleChange = touchDistance / initialTouchDistance;

            // Apply the new scale, but limit it to a maximum and minimum value
            scale *= scaleChange;

            if (scale < 1) scale = 1;
            if (scale > 3) scale = 3;

            if (scale === 1) {
                resetZoom();
            } else {
                viewer.css({
                    transform: `scale(${scale}) translate(${initialTranslateX}px, ${initialTranslateY}px)`,
                    transition: "transform 0.1s ease-out"
                });
            }

            initialTouchDistance = touchDistance; // Update the initial distance for the next move
        }
    }

    // Bind events for mouse and touch
    viewer.on("dblclick", toggleZoom);

    // Mouse events for desktop dragging
    viewer.on("mousedown", startDragging);
    $(document).on("mouseup", stopDragging);
    $(document).on("mousemove", dragImage);

    // Touch events for mobile dragging and pinch zoom
    viewer.on("touchstart", startDragging);
    $(document).on("touchend", stopDragging);
    $(document).on("touchmove", function (event) {
        dragImage(event);
        if (isZoomed) {
            handlePinchZoom(event); // Allow pinch zoom if zoomed in
        }
    });



});



// $(document).ready(function () {
//     // Select all images with the class 'blur-on-load'
//     $(".blur-on-load").each(function () {
//         const $img = $(this);

//         // Wait for the image to fully load
//         $img.on("load", function () {
//             $img.addClass("loaded"); // Add the 'loaded' class to remove blur
//         });

//         // Trigger load event for cached images
//         if ($img[0].complete) {
//             $img.trigger("load");
//         }
//     });
// });
