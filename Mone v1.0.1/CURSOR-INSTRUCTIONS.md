# Fixing the Custom Cursor

I identified an issue with the cursor functionality after implementing the new effects. The original cursor implementation from the theme is being overridden by our new cursor code.

## How to Fix the Cursor

1. Open `index.html` and remove these lines (if present):
   ```html
   <link href="assets/css/cursor.css" rel="stylesheet">
   ```
   
   And at the bottom near other scripts, remove:
   ```html
   <script src="assets/js/cursor.js"></script>
   ```

2. The original cursor functionality is defined in `assets/js/functions.js` and already works correctly:
   ```javascript
   /*===============================================
     2. Cursor
   ===============================================*/
   var customCursor = document.getElementById("cursor");

   if (customCursor) {
     var cursor = document.getElementById("cursor");
     document.addEventListener('mousemove', function(e) {
       cursor.style.left = e.pageX + 'px';
       cursor.style.top = e.pageY + 'px';
     });

     var mouseElms = document.querySelectorAll("a, button, input, textarea, .cursor-link");

     mouseElms.forEach(function(mouseElm) {
       mouseElm.addEventListener("mouseenter", function() {
         cursor.classList.add("scale-cursor");
       });
       mouseElm.addEventListener("mouseleave", function() {
         cursor.classList.remove("scale-cursor");
       });
     });
   }
   ```

3. The original cursor styles are also defined in `assets/css/theme.css` and work properly:
   ```css
   @media (max-width: 991.98px) {
     #cursor {
       display: none;
     }
   }

   @media (min-width: 992px) {
     #cursor {
       z-index: 999;
       position: absolute;
       -webkit-transform: translate(-50%, -50%);
       transform: translate(-50%, -50%);
       background: white;
       width: 10px;
       height: 10px;
       border-radius: 50%;
       mix-blend-mode: difference;
       pointer-events: none;
       -webkit-transition: linear 0.08s;
       transition: linear 0.08s;
     }
     #cursor.scale-cursor {
       -webkit-transform: translate(-50%, -50%) scale(5);
       transform: translate(-50%, -50%) scale(5);
       opacity: 0.15;
     }
   }
   ```

After making these changes, the cursor functionality should work as originally designed in the theme.

The problem occurred because we tried to modify the cursor behavior, but it already had a working implementation in the theme files.
