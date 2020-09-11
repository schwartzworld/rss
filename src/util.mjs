export const findKidInResource = row => {
    return row.name.toLowerCase() === kidName.toLowerCase()
}

export function getImage(string) {
    const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
    const images = [];
    let img;
    while ((img = imgRex.exec(string))) {
        images.push(img[1]);
    }
    return images[0];
}
