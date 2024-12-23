# TempGallVenture / Template Gallery Ventures

Welcome to **TempGallVenture**, a simple and efficient tool for creating responsive image galleries. This guide will walk you through how to set up and use TempGallVenture in your project.

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

<!-- JQUERY -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
```

### Step 2: Copy the HTML Structure
Paste the following HTML into your project and modify the `src` attribute of the `<img>` tags to point to your image files.

```html
<!-- START OF TEMPGALLVENTURE -->
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
</div>
<!-- END OF TEMPGALLVENTURE -->
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
TempGallVenture is distributed under the MIT License. You are free to use, modify, and distribute it as needed.

---

## Support
If you encounter any issues or have questions, please visit the [GitHub repository](https://github.com/Cebucoder/tempgallventure) for more information or to open an issue.

Happy coding!

