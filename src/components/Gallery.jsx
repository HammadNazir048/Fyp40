'use client';

import React, { useEffect, useState } from 'react';
import LightGallery from 'lightgallery/react';
import "./styles.css";

// Import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';

// Import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';

export function Gallery() {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get_images');  // Correct endpoint
            const data = await response.json();
            setImages(data.images); // Update images with paths from the server
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // Periodically fetch images every 5 seconds
    useEffect(() => {
        fetchImages();
        const interval = setInterval(fetchImages, 5000); // Fetch images every 5 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    return (
        <div className="App">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
            >
                {images.map((src, index) => (
                    <a href={src} key={index}>
                        <div className="image-container">
                            <img 
                                alt={`Image ${index + 1}`} 
                                src={src} 
                                onError={(e) => e.currentTarget.style.display = 'none'} 
                            />
                            <span className="image-placeholder">Image not available</span>
                        </div>
                    </a>
                ))}
            </LightGallery>
        </div>
    );
}



// 'use client';

// import React, { useEffect, useState } from 'react';
// import LightGallery from 'lightgallery/react';
// import "./styles.css";

// // Import styles
// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';
// import 'lightgallery/css/lg-autoplay.css';
// import 'lightgallery/css/lg-fullscreen.css';
// import 'lightgallery/css/lg-share.css';
// import 'lightgallery/css/lg-rotate.css';

// // Import plugins
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgAutoplay from 'lightgallery/plugins/autoplay';
// import lgFullscreen from 'lightgallery/plugins/fullscreen';
// import lgShare from 'lightgallery/plugins/share';
// import lgRotate from 'lightgallery/plugins/rotate';

// export function Gallery() {
//     const [images, setImages] = useState([]);
//     const [isFetched, setIsFetched] = useState(false);

//     // Fetch images from the server
//     const fetchImages = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:5000/get_images');
//             const data = await response.json();
            
//             // Update images only if there are new images
//             if (JSON.stringify(data.images) !== JSON.stringify(images)) {
//                 setImages(data.images);
//             }

//             setIsFetched(true); // Mark images as fetched to stop re-fetching
//         } catch (error) {
//             console.error('Error fetching images:', error);
//         }
//     };

//     // Fetch images only once on component mount
//     useEffect(() => {
//         if (!isFetched) {
//             fetchImages();
//         }
//     }, [isFetched]);

//     const onInit = () => {
//         console.log('LightGallery has been initialized');
//     };

//     return (
//         <div className="App">
//             {images.length > 0 ? (
//                 <LightGallery
//                     onInit={onInit}
//                     speed={500}
//                     plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
//                 >
//                     {images.map((src, index) => (
//                         <a href={src} key={index}>
//                             <div className="image-container">
//                                 <img
//                                     alt={`Image ${index + 1}`}
//                                     src={src}
//                                     onError={(e) => (e.currentTarget.style.display = 'none')}
//                                 />
//                             </div>
//                         </a>
//                     ))}
//                 </LightGallery>
//             ) : (
//                 <p>Loading images...</p>
//             )}
//         </div>
//     );
// }
