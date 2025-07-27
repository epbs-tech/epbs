import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

export async function GET(
  request: Request,
  {params}: {params: Promise<{ id: string }>}
) {
  try {
    const { id } = await params;
    const blog = await db.blog.findUnique({
      where: { id: id },
      include: {
        sections: {
          include: {
            contents: {
              orderBy: {
                order: 'asc'
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Erreur lors de la récupération du blog:', error);
    return NextResponse.json(
      { error: 'Error fetching blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  {params}: {params: Promise<{ id: string }>}
) {
  const {id}= await params;
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    // Delete the blog (sections and contents will be deleted due to cascade)
    await db.blog.delete({
      where: { id: id }
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression du blog:', error);
    return NextResponse.json(
      { error: 'Error deleting blog' },
      { status: 500 }
    );
  }
}