# ProvGallery: A Lightweight Image Gallery Tool

Welcome to **ProvGallery**, a simple and efficient tool for creating responsive image galleries. This guide will walk you through how to set up and use ProvGallery in your project.

---

## Features
- Responsive design for a seamless experience on any device.
- Zoom functionality for viewing images in detail.
- Image navigation with next/previous controls.
- Thumbnail viewer for quick image selection.
- Automatically sets the `alt` attribute to "image" if omitted.

---

## How to Use

### Step 1: Include the CSS and JS Files
Add the following lines to your HTML to include the required CSS and JavaScript files via CDN:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Cebucoder/tempgallventure/css/prov_gal_style.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/Cebucoder/tempgallventure/js/prov_gal_script.min.js"></script>
```

### Step 2: Copy the HTML Structure
Paste the following HTML into your project and modify the `src` attribute of the `<img>` tags to point to your image files.

```html
<!-- START OF PROVGALL -->
<div class="proweaver_gallery_con">
  <ul id="proweaver_gallery_list" class="proweaver_gallery_list">

    <!-- Add your image sources here -->
    <!-- If you forget to set an image alt value, it will automatically default to "image" -->

    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg2.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg3.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg4.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg5.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg6.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg7.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg8.jpg" alt="" /> </figure> </li>
    <li> <figure> <img src="https://cebucoder.github.io/tempgallventure/images/sampleImg9.jpg" alt="" /> </figure> </li>
  </ul>

  <div class="proweaver_gall_viewer_con">
    <div class="proweaver_gall_holder">
      <div class="proweaver_gall_header">
        <div id="pro_gallery_counterList" class="proweaver_header_right_con">
          <span id="prov_current_gallery_show">0</span>/<span id="prov_total_gall_list">0</span>
        </div>
        <div class="proweaver_header_left_con">
          <div class="prov_image_sizer">
            <span title="Zoom" class="zoom_function">
              <ion-icon name="search-outline"></ion-icon> 
              <ion-icon class="zoom_plus" name="add-outline"></ion-icon>
            </span>
            <select name="" id="prov_zooming_selector">
              <option value="100%">100%</option>
              <option value="90%">90%</option>
              <option value="80%">80%</option>
            </select>
          </div>
          <div title="Gallery" id="prov_view_min_gallery" class="prov_view_min_gallery">
            <ion-icon name="grid-outline"></ion-icon>
          </div>
          <div title="Close" id="prov_gall_close" class="prov_gall_close">
            <ion-icon name="close-outline"></ion-icon>
          </div>
        </div>
      </div>

      <div class="proweaver_gall_img_viewer">
        <figure>
          <img id="gallery_img_id_viewer" class="zoom" src="" alt="">
        </figure>
      </div>

      <div class="prov_gallery_controller">
        <div class="prov_conroller prov_prev">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </div>
        <div class="prov_conroller prov_next">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </div>
    </div>

    <div id="prov_min_gall_list" class="prov_min_gall_list">
      <ul id="prov_thumb_list" class="prov_thumb_list"></ul>
    </div>
  </div>
</div>
<!-- END OF PROVGALL -->
```

### Step 3: Customize the Image Gallery
1. **Change the Image Source**:
   - Replace `images/sampleImg.jpg` with the path to your image files.
   - Example:
     ```html
     <li> <figure> <img src="path/to/your/image.jpg" alt="Description of the image" /> </figure> </li>
     ```

2. **Add Alt Text** (Optional):
   - Provide meaningful descriptions for better accessibility and SEO. If left empty, the `alt` attribute will default to "image."

---

## License
ProvGallery is distributed under the MIT License. You are free to use, modify, and distribute it as needed.

---

## Support
If you encounter any issues or have questions, please visit the [GitHub repository](https://github.com/Cebucoder/tempgallventure) for more information or to open an issue.

Happy coding!

