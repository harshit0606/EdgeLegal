import excel from '../images/fileIcons/excel.png';
import image from '../images/fileIcons/image.png';
import mail from '../images/fileIcons/mail.png';
import pdf from '../images/fileIcons/pdf.png';
import word from '../images/fileIcons/word.png';
import other from '../images/fileIcons/other.png';

export const returnFileIcon = (type) => {
  console.log(type);
  switch (type) {
    case 'doc':
    case 'docx':
    case 'rtf':
      return word;
    case 'email':
    case 'eml':
    case 'msg':
      return mail;
    case 'image':
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'tif':
      return image;
    case 'pdf':
      return pdf;
    case 'xls':
    case 'xlsx':
      return excel;
    default:
      return other;
  }
};
