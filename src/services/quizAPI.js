import ax from "./axios.config";

const getAllQuiz = async () => {
  try {
    const res = await ax.get("quizzes/");

    if (/20[0-6]/g.test(res.status)) {
      return res.data;
    }
  } catch (error) {
    return [];
  }
};

const getQuizDetails = async (id) => {
  try {
    const res = await ax.get(`quizzes/${id}/`);

    if (/20[0-6]/g.test(res.status)) {
      return res.data;
    }
  } catch (error) {
    return {};
  }
};

const newSitting = async (id) => {
  try {
    const res = await ax.get(`quizzes/${id}/sitting/`);

    if (/20[0-6]/g.test(res.status)) {
      return res.data;
    }
  } catch (error) {
    return error;
  }
};

const toExport = {
  getAllQuiz,
  getQuizDetails,
  newSitting,
};

export default toExport;
