
import { GoogleGenAI, Type } from "@google/genai";
import { AITool, GroundingSource } from "../types";

const API_KEY = process.env.API_KEY || "";

export const fetchLatestAIRanking = async (): Promise<{ tools: AITool[], sources: GroundingSource[] }> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Atue como um especialista em tecnologia e IA cinematográfica. 
  Pesquise na internet e liste as 5 melhores ferramentas de IA para criação de vídeos cinematográficos que possuem as melhores opções gratuitas ou planos sem limitações severas em 2024/2025 (ex: Luma Dream Machine, Kling AI, Runway Gen-3, Pika, Kling, etc.).
  
  Retorne EXCLUSIVAMENTE um JSON seguindo este esquema:
  {
    "tools": [
      {
        "name": "Nome da Ferramenta",
        "description": "Descrição curta e impactante",
        "bestFeatures": ["Recurso 1", "Recurso 2"],
        "link": "https://link-direto.com",
        "rank": 1,
        "freeTierInfo": "Explicação clara sobre como funciona o acesso gratuito"
      }
    ]
  }
  
  Garanta que as informações sejam precisas e atuais.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    
    // Extract sources from grounding metadata
    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return {
      tools: data.tools || [],
      sources: sources
    };
  } catch (error) {
    console.error("Error fetching AI ranking:", error);
    throw new Error("Não foi possível carregar o ranking. Tente novamente mais tarde.");
  }
};
