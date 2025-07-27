import { db } from './db';
import {  Session} from "@prisma/client";

export async function getAllFormations() {
  try {
    const formations = await db.formation.findMany({
      include: {
        syllabus: true,
        sessions: {
          where: {
            startDate: {
              gte: new Date(),
            },
            isOpen: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return formations;
  } catch (error) {
    console.error('Error fetching formations:', error);
    return [];
  }
}

export async function getActiveFormations() {
  try {
    const formations = await db.formation.findMany({
      where: {
        isActive: true,
      },
      include: {
        syllabus: true,
        sessions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return formations;
  } catch (error) {
    console.error('Error fetching active formations:', error);
    return [];
  }
}

export async function getOpenSessions() {
  try {
    const sessions = await db.session.findMany({
      where: {
        isOpen: true,
        startDate: {
          gte: new Date(),
        },
      },
      include: {
        formation: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });
    return sessions;
  } catch (error) {
    console.error('Error fetching open sessions:', error);
    return [];
  }
}

export async function getFormationById(id: string) {
  try {
    const formation = await db.formation.findUnique({
      where: { id },
      include: {
        syllabus: true,
        sessions: {
          where: {
            endDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: 'asc',
          },
        },
      },
    });
    return formation;
  } catch (error) {
    console.error('Error fetching formation:', error);
    return null;
  }
}

export async function getSessionById(id: string) {
  try {
    const session = await db.session.findUnique({
      where: { id },
      include: {
        formation: true,
        registrations: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return session;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}

export async function getSessionsByFormationId(formationId: string) {
  try {
    const sessions = await db.session.findMany({
      where: {
        formationId,
        isOpen: true,
        startDate: {
          gte: new Date(),
        },
      },
      include: {
        formation: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });
    return sessions;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }
}

export async function getRegistrations() {
  try {
    const registrations = await db.registration.findMany({
      include: {
        session: {
          include: {
            formation: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return registrations;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return [];
  }
}

/*export async function createFormation(data: Formation) {
  try {
    const formation = await db.formation.create({
      data: {
        title: data.title,
        description: data.description,
        detailedDescription: data.detailedDescription,
        duration: data.duration,
        category: data.category,
        image: data.image,
        isActive: data.isActive,
        objectives: data.objectives || [],
        prerequisites: data.prerequisites || [],
        syllabus: {
          create: data.syllabus?.map((s: Syllabus) => ({
            title: s.title,
            content: s.content,
          })) || [],
        },
      },
      include: {
        syllabus: true,
      },
    });
    return formation;
  } catch (error) {
    console.error('Error creating formation:', error);
    throw error;
  }
}*/

/*export async function updateFormation(id: string, data: any) {
  try {
    // First, delete existing syllabus
    await db.syllabus.deleteMany({
      where: { formationId: id },
    });

    // Then update formation with new data
    const formation = await db.formation.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        detailedDescription: data.detailedDescription,
        duration: data.duration,
        category: data.category,
        image: data.image,
        isActive: data.isActive,
        objectives: data.objectives || [],
        prerequisites: data.prerequisites || [],
        syllabus: {
          create: data.syllabus?.map((s: Syllabus) => ({
            title: s.title,
            content: s.content,
          })) || [],
        },
      },
      include: {
        syllabus: true,
      },
    });
    return formation;
  } catch (error) {
    console.error('Error updating formation:', error);
    throw error;
  }
}*/

export async function createSession(data: Session) {
  try {
    const session = await db.session.create({
      data: {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location,
        priceEUR: data.priceEUR,
        priceMAD: data.priceMAD,
        maxParticipants: data.maxParticipants,
        formationId: data.formationId,
        isOpen: true,
        currentParticipants: 0,
      },
      include: {
        formation: true,
      },
    });
    return session;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export async function updateSession(id: string, data: Session) {
  try {
    const session = await db.session.update({
      where: { id },
      data: {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location,
        priceMAD: data.priceMAD,
        priceEUR: data.priceEUR,
        maxParticipants: data.maxParticipants,
        formationId: data.formationId,
        isOpen: data.isOpen,
      },
      include: {
        formation: true,
      },
    });
    return session;
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
}

/*export async function createRegistration(data: Registration) {
  try {
    const registration = await db.registration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        sessionId: data.sessionId,
        userId: data.userId,
        status: 'pending',
        paymentMethod: data.paymentMethod || 'pending',
        paymentStatus: 'pending',
      },
      include: {
        session: {
          include: {
            formation: true,
          },
        },
      },
    });

    // Update session participants count
    await db.session.update({
      where: { id: data.sessionId },
      data: {
        currentParticipants: {
          increment: 1,
        },
      },
    });

    return registration;
  } catch (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
}*/