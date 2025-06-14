import type { NumerologyReading } from '../types/numerology';

export const generateReading = async (reading: NumerologyReading): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { name, lifePath, gridFrequencies } = reading;
  
  // Find most and least frequent numbers
  const frequencies = Object.entries(gridFrequencies)
    .map(([digit, freq]) => ({ digit: parseInt(digit), frequency: freq }))
    .sort((a, b) => b.frequency - a.frequency);
  
  const strongestNumbers = frequencies.filter(f => f.frequency === frequencies[0].frequency);
  const missingNumbers = frequencies.filter(f => f.frequency === 0);

  return `Dear ${name},

Your Life Path number ${lifePath} reveals a soul journey of ${lifePath === 1 ? 'leadership and innovation' : 
lifePath === 2 ? 'cooperation and harmony' : 
lifePath === 3 ? 'creativity and expression' :
lifePath === 4 ? 'stability and hard work' :
lifePath === 5 ? 'freedom and adventure' :
lifePath === 6 ? 'nurturing and responsibility' :
lifePath === 7 ? 'spiritual seeking and analysis' :
lifePath === 8 ? 'material mastery and achievement' :
lifePath === 9 ? 'humanitarian service and wisdom' :
lifePath === 11 ? 'spiritual illumination and inspiration' :
lifePath === 22 ? 'master building and manifestation' :
lifePath === 33 ? 'master teaching and healing' : 'unique spiritual purpose'}. This path illuminates your deepest calling and the gifts you bring to the world.

Your energetic grid reveals profound insights about your spiritual blueprint. ${strongestNumbers.length > 0 ? 
`The numbers ${strongestNumbers.map(n => n.digit).join(', ')} appear most frequently in your grid, indicating powerful energetic influences that shape your reality. These numbers represent your natural strengths and the cosmic forces that support your journey.` : ''}

${missingNumbers.length > 0 ? 
`The absence of ${missingNumbers.map(n => n.digit).join(', ')} in your grid suggests areas of spiritual growth and learning. These "missing" energies invite you to explore new dimensions of experience and expand your consciousness in beautiful ways.` : ''}

Your unique energetic signature suggests a soul that ${Math.random() > 0.5 ? 'seeks harmony between the material and spiritual realms' : 'is here to bridge ancient wisdom with modern understanding'}. Trust in the divine timing of your journey, for every experience is perfectly orchestrated for your highest evolution.

Embrace your gifts, honor your challenges, and remember that you are exactly where you need to be on your path.

With cosmic blessings,
The Oracle`;
};
