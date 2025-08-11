import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";

const globalForS3 = global as unknown as { s3Client: S3Client };

export const s3Client = globalForS3.s3Client ?? new S3Client({
    credentials: {
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
        accessKeyId: process.env.ACCESS_KEY!,
    },
    region: "ap-south-1"
});

if (!globalForS3.s3Client) globalForS3.s3Client = s3Client;

export const UPLOAD_OBJECT = async (name: string, data: Uint8Array<ArrayBufferLike>) => {
    try {
        console.log("uploading object")
        const command = new PutObjectCommand({
            Key: `${name}.pdf`,
            Bucket: "applify",
            ContentType: "application/pdf"
        });

        const URL = await getSignedUrl(s3Client, command, {
            expiresIn: 300
        });

        await axios.put(URL, data, {
            headers: {
                'Content-Type': "application/pdf"
            }
        })

    } catch (e: unknown) {
        console.log(e);
    }
}

export const FETCH_OBJECT = async (applicationId: string) => {
    const command = new GetObjectCommand({
        Key: `${applicationId}.pdf`,
        Bucket: 'applify',
        ResponseContentType: "application/pdf"
    });

    const URL = await getSignedUrl(s3Client, command, {
        expiresIn: 300
    });

    return URL;
}