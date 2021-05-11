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

const getQuestion = async (id) => {
  try {
    return await ax.get(`sitting/${id}/question/`);
  } catch (error) {
    return error;
  }
};

const submitAnswer = async (id, data) => {
  try {
    const res = await ax.post(`sitting/${id}/question/`, data);

    if (/20[0-6]/g.test(res.status)) {
      return res.data;
    }
  } catch (error) {
    return error;
  }
};

const getSummary = async (id) => {
  try {
    const res = await ax.get(`sitting/${id}/summary/`);

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
  getQuestion,
  submitAnswer,
  getSummary,
};

export default toExport;
