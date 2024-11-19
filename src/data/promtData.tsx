import {NO_INFO} from './errorCode';

export const genPromtAi = (lng: string) => {
  return `
I give you a picture of a problem.
    Please return only the JSON format
    If the imgage not show any problem, return 
      {
        "isProblem": false,
        "result": No Information,
        "solution_step": No Information,
      }
    Response data follow this example: 
      {
        "isProblem": true,
        "result": The result of that problem in ${lng} language,
        "solution_step": Details of how to solve the problem in ${lng} language,
      }
`;
};

export const genPromtTranslateAi = (tranLng: string) => {
  return `
I give you a picture that contains some text. Please return only the JSON format:
    If the imgage does not have text, return:
      {
        "isProblem": false,
        "result": No Information,
        "solution_step": No Information,
      }
    Response data follow this example: 
      {
        "isProblem": true,
        "result": The translate text of image in ${tranLng} language,
        "solution_step": ${NO_INFO},
      }
`;
};
