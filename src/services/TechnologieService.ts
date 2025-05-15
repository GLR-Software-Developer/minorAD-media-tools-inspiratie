import techDataJson from '../data/technologieen.json';
import projectDataJson from '../data/projecten.json';

export interface Technologie {
  naam: string;
  omschrijving: string;
  notitie: string;
  type: string | string[];
  links: {
    website: string;
    documentatie: string;
    tutorials: string[];
  };
}

export interface Project {
  titel: string;
  omschrijving: string;
  media: {
    type: string;
    url: string;
  };
  technologieen: string[];
  categorieën: string[];
}

/**
 * Service voor het werken met technologie- en projectgegevens
 */
class TechnologieService {
  private technologieen: Technologie[];
  private projecten: Project[];
  
  constructor() {
    // Type casting om import compatibel te maken met onze interfaces
    this.technologieen = techDataJson as Technologie[];
    this.projecten = projectDataJson as Project[];
  }
  
  /**
   * Verkrijg alle technologieën
   */
  getAllTechnologieen(): Technologie[] {
    return this.technologieen;
  }
  
  /**
   * Verkrijg alle technologieën voor een specifieke categorie
   * @param category - De categorie (audio, visueel, data)
   */
  getTechnologieenByCategory(category: string): Technologie[] {
    return this.technologieen.filter(tech => {
      if (Array.isArray(tech.type)) {
        return tech.type.includes(category);
      } else {
        return tech.type === category;
      }
    });
  }
  
  /**
   * Verkrijg een specifieke technologie op basis van naam
   * @param name - De naam van de technologie
   */
  getTechnologieByName(name: string): Technologie | undefined {
    return this.technologieen.find(tech => tech.naam === name);
  }
  
  /**
   * Verkrijg alle projecten
   */
  getAllProjects(): Project[] {
    return this.projecten;
  }
  
  /**
   * Verkrijg projecten voor een specifieke categorie
   * @param category - De categorie (audio, visueel, data)
   */
  getProjectsByCategory(category: string): Project[] {
    return this.projecten.filter(project => project.categorieën.includes(category));
  }
  
  /**
   * Verkrijg projecten die een specifieke technologie gebruiken
   * @param technology - De naam van de technologie
   */
  getProjectsByTechnology(technology: string): Project[] {
    return this.projecten.filter(project => project.technologieen.includes(technology));
  }
}

// Exporteer een singleton instantie
export default new TechnologieService(); 