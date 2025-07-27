import { getActiveFormations, getOpenSessions } from '@/lib/data';
import { FormationCard } from '@/components/formations/formation-card';

export const metadata = {
  title: 'Formations ouvertes - EPBS Consulting',
  description: 'Découvrez nos formations professionnelles disponibles à l\'inscription.',
};

async function FormationsList() {
  const activeFormations = await getActiveFormations();
  const allSessions = await getOpenSessions();
  
  const formationsWithSessions = activeFormations.map(formation => {
    const relatedSessions = allSessions.filter(
      session => session.formationId === formation.id
    );
    return {
      formation,
      sessions: relatedSessions
    };
  });
  
  const formationsWithOpenSessions = formationsWithSessions.filter(
    item => item.sessions.length > 0
  );
  
  if (formationsWithOpenSessions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">
          Aucune formation ouverte à l'inscription pour le moment
        </h3>
        <p className="text-muted-foreground">
          Veuillez consulter notre catalogue complet ou revenir ultérieurement.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {formationsWithOpenSessions.map(({ formation, sessions }) => (
        <FormationCard 
          key={formation.id} 
          formation={formation} 
          sessions={sessions} 
        />
      ))}
    </div>
  );
}

export default function FormationsPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">Formations ouvertes</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos formations professionnelles disponibles à l'inscription. 
            Ces formations sont validées et ouvertes à la préinscription pour des dates spécifiques.
          </p>
        </div>
        <FormationsList />
      </div>
    </div>
  );
}