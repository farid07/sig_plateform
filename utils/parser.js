// export function parse(buffer) {
//     const parsed = parseTorrent(buffer);
//
//     const data = pick(parsed, allowedFields);
//
//     // Announce is an array of strings, join them with a newline to render in textarea
//     data.announce = data.announce.join('\n');
//
//     return data;
// }

// export function readFile(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new global.FileReader();
//         reader.onload = () => resolve(Buffer.from(reader.result));
//         reader.onerrror = reject;
//         reader.readAsArrayBuffer(file);
//     });
// }

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};