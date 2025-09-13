import Papa from 'papaparse';

interface Prompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  type: 'text' | 'text-to-image' | 'text-to-video';
  image: string;
  description: string;
  tags: string;
  contributor: string;
}

export const loadPromptsFromCSV = async (): Promise<Prompt[]> => {
  try {
    const response = await fetch('/prompts.csv');
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<any>(csvText, {
        header: true,
        skipEmptyLines: 'greedy',
        transformHeader: (header: string) => header.trim().toLowerCase(),
        complete: (results) => {
          try {
            const prompts: Prompt[] = results.data.map((row: any) => ({
              id: (row.id?.toString() || '').trim(),
              category: (row.category || '').trim().replace(/\s+/g, ' ').replace(/\n/g, ' '),
              title: (row.title || '').trim().replace(/\s+/g, ' ').replace(/\n/g, ' '),
              prompt: (row.prompt || '').trim(),
              type: (row.type || 'text').trim(),
              image: (row.image || '').trim(),
              description: (row.description || '').trim(),
              tags: (row.tags || '').trim(),
              contributor: (row.contributor || 'LockMan04').trim()
            }));
            resolve(prompts.filter(p => p.id && p.title && p.prompt));
          } catch (error) {
            reject(error);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV file:', error);
    return [];
  }
};

export const getUniqueCategories = (prompts: Prompt[]): string[] => {
  const categories = prompts
    .map(p => p.category.trim())
    .filter(c => c && c !== '')
    .map(c => c.toLowerCase())
    .filter((c, index, arr) => arr.indexOf(c) === index)
    .map(c => {
      // Find the original case version
      const original = prompts.find(p => p.category.trim().toLowerCase() === c)?.category.trim();
      return original || c;
    })
    .sort();
  
  return categories;
};

export const getUniqueTypes = (prompts: Prompt[]): string[] => {
  const types = prompts
    .map(p => p.type.trim())
    .filter(t => t && t !== '')
    .map(t => t.toLowerCase())
    .filter((t, index, arr) => arr.indexOf(t) === index)
    .map(t => {
      // Find the original case version
      const original = prompts.find(p => p.type.trim().toLowerCase() === t)?.type.trim();
      return original || t;
    })
    .sort();
  
  return types;
};
