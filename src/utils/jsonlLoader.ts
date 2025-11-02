
interface Prompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  type: 'text' | 'text-to-image' | 'text-to-video';
  image_before: string;
  image_after: string;
  description: string;
  tags: string;
  contributor: string;
}

export const loadPromptsFromJSONL = async (): Promise<Prompt[]> => {
  try {
    const response = await fetch('/prompts.jsonl');
    const jsonlText = await response.text();

    const prompts: Prompt[] = jsonlText.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        try {
          return JSON.parse(line) as Prompt;
        } catch (error) {
          console.error('Error parsing JSON line:', line, error);
          return null;
        }
      })
      .filter((p): p is Prompt => p !== null && p.id && p.title && p.prompt);

    return prompts;
  } catch (error) {
    console.error('Error loading JSONL file:', error);
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
