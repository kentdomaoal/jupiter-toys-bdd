export class FileUtil {

    static getFilename(filename){
        if (typeof Cypress.env('ENV') !== 'undefined' && Cypress.env('ENV').trim() !== '') {
            filename = filename.concat('.',Cypress.env('ENV'));
        }
        return filename;
    }
    
}