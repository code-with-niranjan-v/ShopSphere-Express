import multer from "multer";
function uploadFile() {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads")
        },
        filename: (req, file, cb) => {
            // let originalName = file.originalname.split('.');
            // let fileType = originalName[(originalName.length - 1)];
            cb(null, generateFileName(file))
        }

    })
}

function generateFileName(file) {
    let originalName = file.originalname.split('.');
    let fileType = originalName[(originalName.length - 1)];
    return (file.fieldname + '-' + Date.now() + '.' + fileType);
}

export { uploadFile, generateFileName }