

function ImageGrid({event, images}) {

    const rows = Math.ceil(images.length / 3);

    return (
        <div className="carousel-inner">
            {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className={`${rowIndex === 0 ? 'item active' : 'item'}`}>
                    {images.slice(rowIndex * 3, rowIndex * 3 + 3).map((imageUrl, imageIndex) => (
                        <a key={imageIndex} style={{cursor:"pointer"}} onClick={()=>event(imageUrl)}>
                            <img style={{width:"28.5%"}} src={imageUrl} alt={`Image ${rowIndex * 3 + imageIndex + 1}`} /></a>
                    ))}
                </div>
            ))}
        </div>
    );
}


export default ImageGrid