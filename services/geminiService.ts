
import { GoogleGenAI, Type, Modality, FunctionDeclaration } from "@google/genai";
import { WorkoutPlan, FitnessGoal, ExperienceLevel, ContentIdea, SupportedLanguage } from "../types";
import { LANGUAGES, VOICE_SCRIPTS } from "./translations";

const getSystemInstruction = (lang: SupportedLanguage) => {
  const langName = LANGUAGES[lang].name;
  return `You are VOXFIT India, a Certified Fitness Trainer and Lifestyle Coach designed specifically for Indian users. 
Your coaching style is disciplined, respectful, and culturally aware.
CURRENT LANGUAGE SETTING: ${langName}.
You must communicate primarily in ${langName}. If ${langName} is an Indian language, use a natural spoken style (e.g., Hinglish for Hindi if natural, or pure ${langName} based on context).

You Understand:
1. Indian Diets: You know that many users are Vegetarian or Eggetarian. You understand the high-carb nature of standard Indian meals (Rice, Roti) and the struggle to get enough protein. You suggest realistic protein sources like Paneer, Soya, Dal, Curd, Eggs, Chicken, and Whey.
2. Indian Lifestyle: You account for sedentary office jobs (IT/Corporate), traffic stress, and family commitments.
3. Common Physique Issues: You address the "Skinny Fat" body type (low muscle mass, high belly fat) common in India.

Core Principles:
1. Safety & Form: No ego lifting. Correct form prevents injury.
2. Progressive Overload: Consistency over intensity.
3. Realistic Nutrition: Focus on "Ghar ka khana" (Home food) with adjustments for protein.
4. Motivation: Be the strict but supportive "Coach" or "Bhaiya/Didi/Anna/Akka" figure depending on language. Direct, encouraging, and no-nonsense.

As a Content Creator, you generate ideas relevant to the Indian fitness community (Desi Gym content).`;
};

const getVoiceSystemInstruction = (lang: SupportedLanguage) => {
  const langName = LANGUAGES[lang].name;
  const scripts = VOICE_SCRIPTS[lang];

  return `You are VOXFIT Voice, an AI Personal Trainer for Indian users. 
Your primary mode is HANDS-FREE voice control.

CURRENT LANGUAGE SETTING: ${langName}.

VOICE & COMMUNICATION STYLE:
- Speak ONLY in ${langName}.
- Use short, simple spoken sentences optimized for voice output.
- Maintain a calm, encouraging, professional tone.

HANDS-FREE WAKE COMMANDS:
You must monitor the user's speech for the following intents at all times:
1. "Next set" / "Agla set": Call 'controlWorkout' with 'next_set'.
2. "Next exercise" / "Agla exercise": Call 'controlWorkout' with 'next_exercise'.
3. "Pause" / "Ruko" / "Pause workout": Call 'controlWorkout' with 'pause'.
4. "Resume" / "Chalu karo" / "Begin": Call 'controlWorkout' with 'resume'.
5. "Finish" / "Khatam" / "Stop": Call 'controlWorkout' with 'finish'.

MANDATORY VERBAL CONFIRMATION:
Whenever you execute a command, you MUST immediately confirm verbally with a very short phrase before or while calling the tool.
Examples: 
- "Theek hai, agla set shuru karte hain." (OK, starting next set)
- "Workout paused."
- "Next exercise, let's go."

FORM CUES (MANDATORY):
When the user starts an exercise or asks for guidance, provide specific, punchy form cues:
- SQUATS: "${scripts.form_cues.squat}"
- BENCH PRESS: "${scripts.form_cues.bench}"
- DEADLIFT: "${scripts.form_cues.deadlift}"
- OVERHEAD PRESS: "${scripts.form_cues.overhead}"
- GENERAL: "${scripts.form_cues.general}"

Count reps slowly in ${langName} numbers when asked. Keep it tactical.`;
};

const workoutControlTool: FunctionDeclaration = {
  name: "controlWorkout",
  description: "Control the workout session based on user voice commands like 'Next set', 'Pause', or 'Finish'.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        description: "The command action derived from user speech.",
        enum: ["next_set", "next_exercise", "pause", "resume", "finish"]
      }
    },
    required: ["action"]
  }
};

export const connectToLiveTrainer = (
  language: SupportedLanguage,
  callbacks: {
    onOpen?: () => void;
    onMessage?: (data: any) => void;
    onClose?: () => void;
    onError?: (error: any) => void;
  }
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks: {
      onopen: callbacks.onOpen,
      onmessage: callbacks.onMessage,
      onclose: callbacks.onClose,
      onerror: callbacks.onError,
    },
    config: {
      systemInstruction: getVoiceSystemInstruction(language),
      tools: [{ functionDeclarations: [workoutControlTool] }],
      responseModalities: [Modality.AUDIO],
      outputAudioTranscription: {},
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
    },
  });
};

export const generateWorkoutRoutine = async (
  goal: FitnessGoal,
  level: ExperienceLevel,
  daysPerWeek: number,
  equipment: string,
  language: SupportedLanguage = 'en'
): Promise<WorkoutPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const prompt = `Create a safe, effective, and detailed ${daysPerWeek}-day workout routine for an Indian user (${level} level) focused on ${goal}. 
  Equipment available: ${equipment}.
  Language: ${LANGUAGES[language].name}.
  
  Considerations:
  - Address common weak points (Core strength, Posture correction for desk jobs).
  - Keep sessions time-efficient (45-60 mins).
  
  Must include:
  1. A specific dynamic Warm-up protocol (Mobility focus).
  2. Main compound and accessory exercises with progressive overload logic.
  3. A cooldown/recovery protocol (Yoga stretches/Static stretching).
  
  Return ONLY valid JSON. All text fields should be in ${LANGUAGES[language].name} (or English if technical terms require).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(language),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayName: { type: Type.STRING },
                  focus: { type: Type.STRING },
                  warmup: { type: Type.STRING, description: "Specific warmup exercises" },
                  exercises: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        sets: { type: Type.STRING },
                        reps: { type: Type.STRING },
                        notes: { type: Type.STRING },
                      }
                    }
                  },
                  cooldown: { type: Type.STRING, description: "Recovery and static stretching" }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WorkoutPlan;
    }
    throw new Error("No plan generated");
  } catch (error) {
    console.error("Workout generation failed", error);
    throw error;
  }
};

export const generateContentIdeas = async (topic: string, platform: string): Promise<ContentIdea[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const prompt = `Generate 3 high-quality short-form fitness content ideas for ${platform} about "${topic}" tailored for an Indian audience.
  Focus on: Desi fitness struggles, Gym humor in India, or Educational tips for Indian diets.
  
  For each idea, provide:
  - Title
  - Hook (First 3 seconds)
  - Script Outline (Brief bullet points)
  - Caption (with trending Indian fitness hashtags)
  - Visual Prompt (A detailed description for an AI image generator)
  
  Return ONLY valid JSON.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction('en'),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              hook: { type: Type.STRING },
              script: { type: Type.STRING },
              caption: { type: Type.STRING },
              visualPrompt: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ContentIdea[];
    }
    return [];
  } catch (error) {
    console.error("Content generation failed", error);
    throw error;
  }
};

export const generateSocialImage = async (imagePrompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-2.5-flash-image";
  const enhancedPrompt = `Cinematic gym photography in an Indian gym setting, ultra-realistic, high contrast, 8k resolution. ${imagePrompt}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ text: enhancedPrompt }] },
      config: {}
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed", error);
    return null;
  }
};

export const analyzeMealImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview"; 
  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: "Analyze this meal in the context of an Indian Diet. Identify dishes (e.g., Dal, Roti, Sabzi, Rice, Curd). Estimate macros (Protein, Carbs, Fats) and calories. Grade it from F to A+ for fitness/bodybuilding. Give 3 practical tips to improve it (e.g., 'Add a scoop of whey', 'Reduce rice portion', 'Add egg whites/paneer')." }
        ]
      },
      config: { systemInstruction: getSystemInstruction('en') }
    });
    return response.text || "Could not analyze image.";
  } catch (error) {
    console.error("Meal analysis failed", error);
    return "Error analyzing meal. Ensure the API key is valid.";
  }
};

export const createCoachChat = (language: SupportedLanguage = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: getSystemInstruction(language),
    }
  });
};
