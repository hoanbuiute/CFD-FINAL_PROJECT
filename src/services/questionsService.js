import axiosInstance from "../utils/axiosInstance";


export const questionsService = {
    getQuestions(query = "") {
      return axiosInstance.get(`/questions${query}`);
    },
    getQuestionBySlug(slug = "") {
      return axiosInstance.get(`/questions${slug}`);
    },
  };