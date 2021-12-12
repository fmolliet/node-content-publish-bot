import AdmZip from 'adm-zip';
import Path from 'path';
import { Service } from 'typedi';

@Service('ZipService')
export default class ZipService {
    
    private files : string[] = [];
    
    private entries: AdmZip.IZipEntry[] | undefined;
    
    private zip: AdmZip | undefined;
    
    async extractFiles( path: string ): Promise<string[]>{
        this.zip = new AdmZip(path);

        this.entries = this.zip.getEntries()
        
        this.files = await this.getEntries();
        
        return new Promise( this.extractAll.bind(this) );
        
        
    }
    
    extractAll( resolve: Function, reject: Function ){
            
        if ( this.files!.length > 0) {
            
            this.zip!.extractAllTo("./temp/", true );
            resolve(this.files);
            
        }

    }
    
    private getEntries(): Promise<string[]> {
        return new Promise( ( resolve, reject ) => {
            
            const files: string[] = [];
            
            this.entries!.forEach(function (zipEntry) {
                files.push(Path.resolve(`./temp/${zipEntry.name}`));
            });
            
            resolve(files);
        })
        
    }
}