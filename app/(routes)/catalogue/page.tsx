import { getAllFormations} from '@/lib/data';
import { FormationCard } from '@/components/formations/formation-card';

export const metadata = {
  title: 'Catalogue des formations - EPBS Consulting',
  description: 'Consultez notre catalogue complet de formations professionnelles.',
};

async function CatalogueContent() {
  const formations = await getAllFormations();
  if (formations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">
          Aucune formation disponible pour le moment
        </h3>
        <p className="text-muted-foreground">
          Veuillez revenir ultérieurement pour consulter notre catalogue.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {formations.map(formation => (
        <FormationCard 
          key={formation.id} 
          formation={formation} 
          sessions={formation.sessions}
          allowRegistration={false}
        />
      ))}
    </div>
  );
}

export default function CataloguePage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">Catalogue des formations</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Consultez notre catalogue complet de formations professionnelles. 
            Ces formations sont présentées à titre informatif et ne sont pas 
            nécessairement ouvertes à l'inscription actuellement.
          </p>
        </div>
        <CatalogueContent />
      </div>
    </div>
  );
}