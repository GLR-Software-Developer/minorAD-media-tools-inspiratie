import techDataJson from '../data/technologieen.json';

export interface Technologie {
  naam: string;
  omschrijving: string;
  note: string;
  type: string | string[];
  links: {
    website: string;
    documentatie: string;
    tutorials: {
      title: string;
      url: string;
    }[];
  };
  examples: {
    title: string;
    note: string;
    image: string;
    url: string;
  }[];
}

export interface Project {
  title: string;
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
  
  constructor() {
    // Type casting om import compatibel te maken met onze interfaces
    this.technologieen = techDataJson as Technologie[];
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
}

// Exporteer een singleton instantie
export default new TechnologieService(); 