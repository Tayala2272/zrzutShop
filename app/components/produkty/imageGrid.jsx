

function ImageGrid({event, images}) {

    const rows = Math.ceil(images.length / 4);

    return (
        <div className="carousel-inner">
            {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className={`${rowIndex === 0 ? 'item active' : 'item'}`}>
                    {images.slice(rowIndex * 4, rowIndex * 4 + 4).map((imageUrl, imageIndex) => (
                        <a key={imageIndex} style={{cursor:"pointer"}} onClick={()=>event(imageUrl)}><img src={imageUrl} alt={`Image ${rowIndex * 4 + imageIndex + 1}`} /></a>
                    ))}
                </div>
            ))}
        </div>
    );
}


export default ImageGrid