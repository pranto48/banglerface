import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToR2, isR2Configured } from '@/lib/r2/client';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'ফাইল পাওয়া যায়নি (No file provided)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadFileToR2(buffer, file.name, file.type);

    return NextResponse.json({
      success: result.success,
      url: result.url,
      key: result.key,
      isConfigured: isR2Configured(),
      error: result.error,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
