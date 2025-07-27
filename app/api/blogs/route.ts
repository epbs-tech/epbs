import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

export async function GET() {
  try {
    const blogs = await db.blog.findMany({
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Erreur lors de la récupération des blogs:', error);
    return NextResponse.json(
      { error: 'Error fetching blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    const data = await request.json();
    const { title, author, description,imageUrl, published = false, sections } = data;

    const blog = await db.blog.create({
      data: {
        title,
        author,
        description,
        published,
        imageUrl,
        sections: {
          create: sections?.map((section: any, sectionIndex: number) => ({
            title: section.title,
            order: sectionIndex,
            contents: {
              create: section.contents?.map((content: any, contentIndex: number) => ({
                type: content.type,
                order: contentIndex,
                text: content.text,
                listItems: content.listItems,
                listType: content.listType,
                tableData: content.tableData,
              })) || []
            }
          })) || []
        }
      },
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

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Erreur lors de la création du blog:', error);
    return NextResponse.json(
      { error: 'Error creating blog' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    const data = await request.json();
    const { id, title, author, description,imageUrl, published, sections } = data;

    // First, delete existing sections and their contents
    await db.section.deleteMany({
      where: { blogId: id },
    });

    // Then update blog with new data
    const blog = await db.blog.update({
      where: { id },
      data: {
        title,
        author,
        description,
        published,
        imageUrl,
        sections: {
          create: sections?.map((section: any, sectionIndex: number) => ({
            title: section.title,
            order: sectionIndex,
            contents: {
              create: section.contents?.map((content: any, contentIndex: number) => ({
                type: content.type,
                order: contentIndex,
                text: content.text,
                listItems: content.listItems,
                listType: content.listType,
                tableData: content.tableData,
              })) || []
            }
          })) || []
        }
      },
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

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du blog:', error);
    return NextResponse.json(
      { error: 'Error updating blog' },
      { status: 500 }
    );
  }
}