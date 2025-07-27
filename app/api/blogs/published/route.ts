import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      where: {
        published: true
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Erreur lors de la récupération des blogs publiés:', error);
    return NextResponse.json(
      { error: 'Error fetching published blogs' },
      { status: 500 }
    );
  }
}