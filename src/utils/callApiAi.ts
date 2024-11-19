import {genPromtAi, genPromtTranslateAi} from '~/data/promtData';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {convertImageToBase64} from '~/utils/uriToBase64';
import Config from 'react-native-config';
import {NO_INFO, Error, ERROR_MSG} from '~/data/errorCode';

const AI_MODEL = Config.AI_MODEL;
const AI_API_KEY = Config.API_KEY_GENAI;
const genAI = new GoogleGenerativeAI(AI_API_KEY);
const model = genAI.getGenerativeModel({model: AI_MODEL});

export type AiAnswerFormat = {
  isProblem: string;
  result: string;
  solution_step: string;
};

export const resolveProblem = async (image: string, lang: string) => {
  const prompt = genPromtAi(lang);
  const base64Img = await convertImageToBase64(image);
  if (!base64Img) {
    console.error('Convert image to base 64 failed!');
    return {success: false, data: ERROR_MSG.IMAGE_CONVERT_FAILER};
  }
  try {
    const genRequest = {
      inlineData: {
        data: base64Img,
        mimeType: 'image/jpeg',
      },
    };
    const result = await model.generateContent([prompt, genRequest]);
    if (
      !result.response.text() ||
      result.response.text() === '{}' ||
      result.response.text() === ' {}'
    ) {
      console.error('AI result is empty!');
      return {success: false, data: ERROR_MSG.AI_SERVER_DOWN};
    }
    return {success: true, data: result.response.text()};
  } catch (error) {
    console.error('AI is overload:----', error);
    return {success: false, data: ERROR_MSG.AI_SERVER_DOWN};
  }
};

export const translateText = async (image: string, tranLang: string) => {
  const prompt = genPromtTranslateAi(tranLang);
  const base64Img = await convertImageToBase64(image);
  if (!base64Img) {
    console.error('Convert image to base 64 failed!');
    return {success: false, data: ERROR_MSG.IMAGE_CONVERT_FAILER};
  }
  try {
    const genRequest = {
      inlineData: {
        data: base64Img,
        mimeType: 'image/jpeg',
      },
    };
    const result = await model.generateContent([prompt, genRequest]);
    if (
      !result.response.text() ||
      result.response.text() === '{}' ||
      result.response.text() === ' {}' || 
      result.response.text() === '' 
    ) {
      console.error('AI result is empty!');
      return {success: false, data: ERROR_MSG.AI_SERVER_DOWN};
    }
    return {success: true, data: result.response.text()};
  } catch (error) {
    console.error('AI is overload:----', error);
    return {success: false, data: ERROR_MSG.AI_SERVER_DOWN};
  }
};

export const resolveAnswerFromAi = (answer: string) => {
  /**
   * AI answer has form of object with key: result, solution_step
   */
  const appendAnswer = answer + " "
  console.log("AI answer has form of object with key---", answer);
  const startIndex = appendAnswer.indexOf('{');
  const endIndex = appendAnswer.lastIndexOf('}') + 1;
  const resolvedData: AiAnswerFormat = JSON.parse(answer.slice(startIndex, endIndex));
  return resolvedData;
};
