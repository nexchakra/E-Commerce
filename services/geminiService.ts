
import { GoogleGenAI, Type } from "@google/genai";
import { Product, StylingRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * AI Stylist: Recommends products based on user query
 */
export async function getStylistAdvice(
  userQuery: string,
  products: Product[],
  history: { role: string; text: string }[]
): Promise<StylingRecommendation> {
  const modelName = 'gemini-3-flash-preview';
  
  const productContext = products.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Category: ${p.category}, Price: $${p.price}, Description: ${p.description}`
  ).join('\n');

  const systemInstruction = `
    You are a high-end luxury fashion stylist for "Lumina Luxe". 
    Your goal is to help customers find the perfect outfit from our catalog.
    Be sophisticated, helpful, and knowledgeable about current trends.
    
    Current Catalog:
    ${productContext}
    
    Always respond in JSON format matching the schema provided.
    If no products match, provide helpful fashion advice and suggest similar categories.
  `;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: [
      ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: userQuery }] }
    ],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: {
            type: Type.STRING,
            description: "A friendly and expert explanation of why these products were chosen.",
          },
          recommendedProductIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of product IDs that match the user's needs.",
          },
        },
        required: ["reasoning", "recommendedProductIds"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return { reasoning: "I'm having trouble accessing my styling books right now, but I'd love to help you browse our collections.", recommendedProductIds: [] };
  }
}

/**
 * Visual Search: Analyzes an image and finds matching catalog items
 */
export async function visualSearch(
  imageBase64: string,
  products: Product[]
): Promise<StylingRecommendation> {
  const modelName = 'gemini-3-flash-preview';

  const productContext = products.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Description: ${p.description}`
  ).join('\n');

  const systemInstruction = `
    You are a visual fashion recognition expert. 
    Analyze the uploaded image and identify the style, color, and type of clothing.
    Then, find the closest matching products from the following catalog.
    
    Catalog:
    ${productContext}
    
    Return a JSON object with 'reasoning' (explaining what you see in the image and why these products match) 
    and 'recommendedProductIds'.
  `;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: {
      parts: [
        { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
        { text: "Find products in our catalog that match this image's style." }
      ]
    },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: { type: Type.STRING },
          recommendedProductIds: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["reasoning", "recommendedProductIds"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return { reasoning: "Visual search failed. Please try again with a clearer image.", recommendedProductIds: [] };
  }
}

/**
 * Complementary Items: Suggests pairings for a specific product
 */
export async function getComplementarySuggestions(
  product: Product,
  allProducts: Product[]
): Promise<StylingRecommendation> {
  const modelName = 'gemini-3-flash-preview';
  
  const otherProducts = allProducts.filter(p => p.id !== product.id);
  const catalogContext = otherProducts.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Category: ${p.category}, Description: ${p.description}`
  ).join('\n');

  const systemInstruction = `
    You are a luxury fashion curator for "Lumina Luxe".
    The customer is currently viewing the following item:
    Name: ${product.name}, Brand: ${product.brand}, Category: ${product.category}, Description: ${product.description}.
    
    Task: Find 2-3 items from our catalog that would "complete the look" or pair exceptionally well with this item.
    Consider color theory, style harmony (e.g., formal with formal), and occasion suitability.
    
    Catalog:
    ${catalogContext}
    
    Always respond in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: "Suggest complementary items to create a full outfit.",
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: {
            type: Type.STRING,
            description: "A short, elegant stylist's note on why these pieces were paired together.",
          },
          recommendedProductIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Product IDs for the complementary items.",
          },
        },
        required: ["reasoning", "recommendedProductIds"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return { reasoning: "Explore our curated pairings below.", recommendedProductIds: [] };
  }
}
