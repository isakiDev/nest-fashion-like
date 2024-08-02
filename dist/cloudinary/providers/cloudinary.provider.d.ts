import { ConfigService } from '@nestjs/config';
export declare const CloudinaryProvider: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (config: ConfigService) => import("cloudinary").ConfigOptions;
};
