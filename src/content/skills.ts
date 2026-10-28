import type { Skill } from '@/types';

export const skills: Skill[] = [
  { id: 'python', name: 'Python', icon: 'python', category: 'backend', featured: true },
  { id: 'fastapi', name: 'FastAPI', icon: 'fastapi', category: 'backend', featured: true },
  { id: 'cpp', name: 'C++', icon: 'cpp', category: 'backend' },
  { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', category: 'backend' },
  { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', category: 'backend' },
  { id: 'rest', name: 'REST API', icon: 'rest', category: 'backend' },
  { id: 'graphql', name: 'GraphQL', icon: 'graphql', category: 'backend' },

  { id: 'react', name: 'React', icon: 'react', category: 'frontend', featured: true },
  { id: 'javascript', name: 'JavaScript', icon: 'javascript', category: 'frontend' },
  { id: 'html', name: 'HTML', icon: 'html', category: 'frontend' },
  { id: 'css', name: 'CSS', icon: 'css', category: 'frontend' },
  { id: 'vite', name: 'Vite', icon: 'vite', category: 'frontend' },

  { id: 'tensorflow', name: 'TensorFlow', icon: 'tensorflow', category: 'ai', featured: true },
  { id: 'pytorch', name: 'PyTorch', icon: 'pytorch', category: 'ai', featured: true },
  { id: 'scikitlearn', name: 'scikit-learn', icon: 'scikitlearn', category: 'ai', featured: true },
  { id: 'numpy', name: 'NumPy', icon: 'numpy', category: 'ai' },
  { id: 'pandas', name: 'Pandas', icon: 'pandas', category: 'ai' },
  { id: 'matplotlib', name: 'Matplotlib', icon: 'matplotlib', category: 'ai' },
  { id: 'gemini', name: 'Gemini API', icon: 'gemini', category: 'ai' },
  { id: 'openrouter', name: 'OpenRouter', icon: 'openrouter', category: 'ai' },

  { id: 'docker', name: 'Docker', icon: 'docker', category: 'tools', featured: true },
  { id: 'github', name: 'GitHub', icon: 'github', category: 'tools' },
  { id: 'githubactions', name: 'GitHub Actions', icon: 'githubactions', category: 'tools' },
  { id: 'netlify', name: 'Netlify', icon: 'netlify', category: 'tools' },
  { id: 'pytest', name: 'pytest', icon: 'pytest', category: 'tools' },
];
