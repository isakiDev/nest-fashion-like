/// <reference types="multer" />
import { type UploadApiErrorResponse, type UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File, folder: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteFile(id: string, prefix?: string): Promise<void>;
}
