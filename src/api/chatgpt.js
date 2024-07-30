import axios from 'axios';

export const generateActivities = async (goalTitle, goalDescription) => {
  const prompt = `
Given the goal "${goalTitle}" with the description "${goalDescription}", generate 30 activities I can do towards this goal separated into short, medium, and long time requirements.

Format:
Short:
1. Short activity 1
2. Short activity 2
3. ...
10. Short activity 10

Medium:
1. Medium activity 1
2. Medium activity 2
3. ...
10. Medium activity 10

Long:
1. Long activity 1
2. Long activity 2
3. ...
10. Long activity 10
`;

  try {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: prompt },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + process.env.OPEN_AI_API_KEY,
          },
        }
      );
    console.log(response.data.choices[0].message.content)
    const activitiesText = response.data.choices[0].message.content;
    return parseActivities(activitiesText);
  } catch (error) {
    console.error('Error generating activities:', error);
    throw error;
  }
};

const parseActivities = (activitiesText) => {
  const activities = [];

  const shortRegex = /\*\*?Short:\*\*?\n([\s\S]*?)\n\n/i;
  const mediumRegex = /\*\*?Medium:\*\*?\n([\s\S]*?)\n\n/i;
  const longRegex = /\*\*?Long:\*\*?\n([\s\S]*?)\n\n/i;
  
  const shortMatch = activitiesText.match(shortRegex);
  const mediumMatch = activitiesText.match(mediumRegex);
  const longMatch = activitiesText.match(longRegex);

  if (shortMatch) {
    shortMatch[1].split('\n').forEach((activity, index) => {
      const trimmedActivity = activity.replace(/^\d+\.\s*/, '').trim();
      if (trimmedActivity) activities.push({ title: trimmedActivity, duration: 0 });
    });
  }

  if (mediumMatch) {
    mediumMatch[1].split('\n').forEach((activity, index) => {
      const trimmedActivity = activity.replace(/^\d+\.\s*/, '').trim();
      if (trimmedActivity) activities.push({ title: trimmedActivity, duration: 1 });
    });
  }

  if (longMatch) {
    longMatch[1].split('\n').forEach((activity, index) => {
      const trimmedActivity = activity.replace(/^\d+\.\s*/, '').trim();
      if (trimmedActivity) activities.push({ title: trimmedActivity, duration: 2 });
    });
  }

  return activities;
};
