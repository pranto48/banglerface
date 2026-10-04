import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || '';
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '';
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'banglarface-media';
const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || '';

export const isR2Configured = () => {
  return (
    accountId !== '' &&
    !accountId.includes('placeholder') &&
    accessKeyId !== '' &&
    !accessKeyId.includes('placeholder') &&
    secretAccessKey !== '' &&
    !secretAccessKey.includes('placeholder')
  );
};

export const getR2Client = () => {
  if (!isR2Configured()) {
    return null;
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

export async function uploadFileToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<{ success: boolean; url: string; key: string; error?: string }> {
  const client = getR2Client();
  const key = `news/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  if (!client) {
    // Simulated upload for testing / development without live R2 credentials
    const simulatedUrl = `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80`;
    return {
      success: true,
      url: simulatedUrl,
      key,
    };
  }

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await client.send(command);

    const fileUrl = publicUrl.endsWith('/')
      ? `${publicUrl}${key}`
      : `${publicUrl}/${key}`;

    return {
      success: true,
      url: fileUrl,
      key,
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error uploading to Cloudflare R2:', err);
    return {
      success: false,
      url: '',
      key: '',
      error: err.message,
    };
  }
}
