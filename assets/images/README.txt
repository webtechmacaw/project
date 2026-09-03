============================================
  DriveMaster – Add YOUR Images Here
============================================

All Unsplash images have been removed.
Every image area on the site is an empty box (placeholder).

HOW TO ADD YOUR IMAGES
----------------------
1. Put your photo files in this folder (assets/images/).
   Example names:
     hero.jpg
     course-two-wheeler.jpg
     course-four-wheeler.jpg
     instructor-1.jpg
     vehicle-corolla.jpg
     etc.

2. Open the HTML page and find the placeholder, e.g.:

     <div class="img-box img-box-hero" ...>
       <span>📷 ...</span>
     </div>

3. Replace it with your image:

     <div class="img-box img-box-hero">
       <img src="../assets/images/hero.jpg" alt="Student driving lesson">
     </div>

   Or use CSS background:

     <div class="img-box img-box-hero" style="background-image:url('../assets/images/hero.jpg'); border:none;">
     </div>

TIPS
----
- Use WebP or compressed JPG for faster loading
- Hero images: about 1200×900 px
- Instructor photos: square, about 600×600 px
- Vehicle photos: 16:10, about 800×500 px
============================================
