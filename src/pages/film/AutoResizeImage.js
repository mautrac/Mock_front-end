import React, { useRef, useEffect } from 'react';

const AutoSizeImage = ({ src, alt }) => {
    const imgRef = useRef(null);

    const resizeImage = () => {
        if (imgRef.current) {
          const parentWidth = imgRef.current.parentElement.clientWidth;
          imgRef.current.style.width = `${parentWidth}px`;
          console.log(parentWidth);
        }
    };
    useEffect(() => {

        resizeImage();
        // Event listener for window resize
        window.addEventListener('resize', resizeImage);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', resizeImage);
        };
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div style={{ overflow: 'hidden' }}>
      <img ref={imgRef} src={src} alt={alt} style={{ display: 'block', width: '100%' }} />
    </div>
  );
};

export default AutoSizeImage;
