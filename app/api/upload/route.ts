import { NextResponse } from 'next/server';
import { writeFile, readdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get existing images to determine next number
    const assetsDir = path.join(process.cwd(), 'public', 'assets');
    const files = await readdir(assetsDir);
    const imageNumbers = files
      .filter(f => f.match(/^image\d+\.jpg$/))
      .map(f => parseInt(f.match(/^image(\d+)\.jpg$/)?.[1] || '0'));
    
    const nextNumber = Math.max(...imageNumbers, 0) + 1;
    const fileName = `image${nextNumber}.jpg`;
    const filePath = path.join(assetsDir, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, path: `/assets/${fileName}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}